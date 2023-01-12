//import { AuthEffects } from './state/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { StoreModule } from '@ngrx/store';
import { featureKey } from './state/auth.selector';
import { AuthReducer } from './state/auth.reducer';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //EffectsModule.forFeature(),
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureKey, AuthReducer)
  ],
})
export class AuthModule {}
