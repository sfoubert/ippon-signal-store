import { computed, effect } from '@angular/core';
import { getState, signalStoreFeature, withComputed, withHooks, withState } from '@ngrx/signals';

export function withIpponLogging() {
  return signalStoreFeature(
    withHooks({
        onInit(store) {
          effect(() => {
            // The effect is re-executed on state change.
            const state = getState(store);
            console.log('change state', state);
          });
        },
      }),
  );
}