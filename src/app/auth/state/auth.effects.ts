import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import {
  loginStart,
  loginSuccess
} from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { setErrorMessage, setLoadingSpinner } from 'src/app/store/actions/shared.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);

            return loginSuccess({ user });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => { // tap does not retun anything, map does.
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false } // By not dispacthing an action, the effect does return an observable.
  );
}
