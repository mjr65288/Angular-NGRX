import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  increment,
  decrement,
  reset,
  customIncrement,
} from '../store/actions/counter.action';
import { CounterState } from '../store/models/counter-state.model';
import { AppState } from '../store/app.state';

import { selectFeatureCount } from '../store/selectors/counter.selector';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent implements OnInit, OnDestroy {
  count$!: Observable<CounterState>;
  featureCount$!: Observable<number>;

  counter!: number;
  counterSubscription!: Subscription;

  constructor(private store: Store</*{ count: CounterState } or */ AppState>) {}

  ngOnInit(): void {
    /**
     * below are 2 different ways to work with the observale (count$)
     */
    //1. This way requires subscription clean up, ngOnDestroy()
    //this.count$ = this.store.select('count');
    /*this.counterSubscription = this.count$.subscribe((data: CounterState) => {
      this.counter = data.count;
      console.log(this.counter);
    });*/

    //2. This way no clean up needed since using async Pipe in template
    //this.count$ = this.store.select('count');

    this.featureCount$ = this.store.select(selectFeatureCount);
  }

  increment() {
    this.store.dispatch(increment());
  }

  custIncrement() {
    this.store.dispatch(customIncrement({ valueToIncreaseBy: 3 }));
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  ngOnDestroy(): void {
    //this.counterSubscription.unsubscribe();
  }
}
