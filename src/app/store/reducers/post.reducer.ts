import { createReducer, on } from '@ngrx/store';

import {
  addPost, updatePost, deletePost
} from '../actions/post.action';
import { initialState } from '../states/post.state';
import { Post } from '../models/post.model';
import { Action } from 'rxjs/internal/scheduler/Action';

export const _postReducer = createReducer(
  initialState,
  on(addPost, (state, payload) => {

    let post = { ...payload.post };
    post.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, post]
    }
  }),
  on(updatePost, (state, payload) => {

    let post = { ...payload.post };
    post.id = (state.posts.length + 1).toString();

    let updatedPost = state.posts.map((post: Post) => {
      return payload.post.id === post.id ? payload.post : post;
    })

    return {
      ...state,
      posts: updatedPost
    }
  }),
  on(deletePost, (state, { id }) => {

    let updatedPost = state.posts.filter((post: Post) => {
      return id !== post.id;
    });

    return {
      ...state,
      posts: updatedPost
    }
  })
);

export function postReducer(state: any, action: any) {
  return _postReducer(state, action);
}
