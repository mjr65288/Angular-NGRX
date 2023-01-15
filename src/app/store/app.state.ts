import { CounterState } from './models/counter-state.model';
import { PostsState } from './models/post.model';

import { counterReducer } from './reducers/counter.reducer';
import { postReducer } from './reducers/post.reducer';
import { SharedReducer } from './reducers/shared.reducer';
import { SHARED_STATE_NAME } from './selectors/shared.selector';
import { SharedState } from './states/shared.state';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
};

/*
export interface AppState {
  counter: CounterState;
  posts: PostsState;
}

export const appReducer = {
  count: counterReducer,
  posts: postReducer,
};
*/
