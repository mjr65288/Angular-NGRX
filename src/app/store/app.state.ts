import { AuthReducer } from '../auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';
import { AuthState } from '../auth/state/auth.state';


import { SharedReducer } from './reducers/shared.reducer';
import { SHARED_STATE_NAME } from './selectors/shared.selector';
import { SharedState } from './states/shared.state';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
};
