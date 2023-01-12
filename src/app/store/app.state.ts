import { GalleryModel } from '../gallery/gallery.model';

import { CounterState } from './models/counter-state.model';
import { PostsState } from './models/post.model';

import { counterReducer } from './reducers/counter.reducer';
import { postReducer } from './reducers/post.reducer';

export interface AppState {
  gallery: GalleryModel[];
}

export interface AppState {
  counter: CounterState;
  posts: PostsState;
}

export const appReducer = {
  count: counterReducer,
  posts: postReducer,
};
