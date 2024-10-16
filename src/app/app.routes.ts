import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'user',
        loadComponent: () =>
            import('./features/user-details/user-details.component')
                .then(m => m.UserDetailsComponent)
    }
];
