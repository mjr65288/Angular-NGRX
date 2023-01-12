import { state } from '@angular/animations';
import { createSelector, createFeatureSelector } from '@ngrx/store';

import { PostsState, Post } from '../models/post.model';

//featurekey value should match with the app.state AppReducer prop
export const featureKey = 'posts';

export const selectFeature = createFeatureSelector<PostsState>(featureKey);

export const selectFeaturePosts = createSelector(
  selectFeature,
  (state: PostsState) => state.posts
);

//adding a prop to the selector
export const selectPostById = createSelector(selectFeature, (state:PostsState, props: any) => {
  return state.posts.find((post: Post) => post.id === props.id);
});
