import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { StoreModule } from '@ngrx/store';
import { postReducer } from '../store/reducers/post.reducer';
import { featureKey } from '../store/selectors/posts.selector';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    children: [{ path: 'add', component: AddPostComponent },
    { path: 'edit/:id', component: EditPostComponent }],
  },
];

@NgModule({
  declarations: [
    PostListComponent,
    AddPostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureKey, postReducer),
  ],
})
export class PostsModule {}
