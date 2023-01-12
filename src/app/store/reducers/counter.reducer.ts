import { createReducer, on } from '@ngrx/store';

import {
  increment,
  decrement,
  reset,
  customIncrement,
} from '../actions/counter.action';
import { initialState } from '../states/counter.state';

export const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ ...state, count: state.count + 1 })),
  on(decrement, (state) => ({ ...state, count: state.count - 1 })),
  on(reset, (state) => ({ ...state, count: 0 })),
  on(customIncrement, (state, value) => ({
    ...state,
    count: state.count + value.valueToIncreaseBy,
  }))
);

export function counterReducer(state: any, action: any) {
  //return counterReducer(state, action);
  return _counterReducer(state, action);
}
