import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';
import { UserService } from '../../app/features/user.service';
import { User } from '../../app/features/user.model';
import { withIpponLogging } from '../custom/ippon-logging.feature';


const initialState = {
    isLoading: false,
    user: {
        id: 0,
        firstName: 'John',
        lastName: 'Doe',
        address: {}
    } as User,
    authorities: ['READ_ONLY']
}

export const IpponStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ user: { firstName, lastName } }) => ({
        name: computed(() => `${firstName()} ${lastName()}`),
    })),

    withMethods((store, userService = inject(UserService)) => ({
        reset() {
            patchState(store, initialState);
        },
        changeName(firstName: string, lastName: string) {
            patchState(store, { user: { ...store.user(), firstName, lastName } });
        },
        getAddressFromExternal: rxMethod<number>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                switchMap((userId) => {
                    return userService.getAddressByUserId(userId).pipe(
                        tapResponse({
                            next: (address) => patchState(store, { isLoading: false, user: { ...store.user(), address } }),
                            error: (err) => {
                                patchState(store, { isLoading: false });
                                console.error(err);
                            },
                        })
                    )
                })
            )
        ),
    }),
    ),

    withHooks(({ name, changeName }) => {
        return {
            onInit() {
                console.log('init store');
            },
            onDestroy() {
                console.log('destroy du store contenant l\'utilisateur : ', name());
                changeName('', '');
            },
        };
    }),


      withIpponLogging()
);