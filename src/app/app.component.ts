import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { getErrorMessage, getLoading } from './store/selectors/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showLoading$!: Observable <Boolean>;
  errorMessage$!: Observable<string>;
  constructor(private store: Store<AppState>){

  }

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
  }
}
