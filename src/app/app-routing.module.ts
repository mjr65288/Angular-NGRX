import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'counter',
    loadChildren: () => import('./components/counter/counter.module').then((m)=> m.CounterModule),
  },
  {
    path: 'post-list',
    component: PostListComponent,
    children: [{ path: 'add', component: AddPostComponent },
    { path: 'edit/:id', component: EditPostComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
