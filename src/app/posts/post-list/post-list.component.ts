import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  increment,
  decrement,
  reset,
  customIncrement,
} from '../../store/actions/counter.action';
import { Post } from '../../store/models/post.model';
import { AppState } from '../../store/app.state';

import { selectFeaturePosts } from '../../store/selectors/posts.selector';
import { deletePost } from '../../store/actions/post.action';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.posts$ = this.store.select(selectFeaturePosts);
  }

  onDeletePost(id:string){
    //dialog box
    if(confirm('Are you sure you want to delete?')){
      this.store.dispatch(deletePost({id}));
    }

  }
}
