//import { setLoadingSpinner } from './../../store/Shared/shared.actions';
//import { loginStart } from './../state/auth.actions';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

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
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    //this.store.dispatch(setLoadingSpinner({ status: true }));
    //this.store.dispatch(loginStart({ email, password }));
    console.log(this.loginForm.value);
  }
}
