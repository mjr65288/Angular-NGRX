import { loginStart } from './../state/auth.actions';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/actions/shared.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
      ])
    });
  }

  get registerFormControl() {
    return this.loginForm.controls;
  }

  onLoginSubmit() {
    const email = this.loginForm.value.email; //test@test.com, 123456
    const password = this.loginForm.value.password;
    //console.log(this.loginForm.value);
    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(loginStart({email, password}));//This will trigger the auth.effect since we are filtering
    //for the loginStart action. See code of auth.effect
  }
}
