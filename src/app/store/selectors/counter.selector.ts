import { createSelector, createFeatureSelector } from '@ngrx/store';

import { CounterState } from '../models/counter-state.model';

//featurekey value should match with the app.state AppReducer prop
export const featureKey = 'count';

export const selectFeature = createFeatureSelector<CounterState>(featureKey);

export const selectFeatureCount = createSelector(
  selectFeature,
  (state: CounterState) => state.count
);
