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
      ofType(loginStart),//ofType filters for loginStart action.https://www.tektutorialshub.com/angular/using-exhaustmap-in-angular/
      exhaustMap((action) => {
        return this.authService
          .login(action.email, action.password)//exhaustMap must retun an observable, which .login() does.
          .pipe(map((data) => {
            const user = this.authService.formatUser(data)
            return loginSuccess({user:user}); //call the loginSuccess action, another way of dispatching an action
          })
          );
      })
    );
  })
}
