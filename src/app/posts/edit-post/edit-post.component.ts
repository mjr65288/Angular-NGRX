import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Post } from '../../store/models/post.model'
import { AppState } from '../../store/app.state';
import { addPost, updatePost } from '../../store/actions/post.action';

import { selectPostById } from '../../store/selectors/posts.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm!: FormGroup;
  post!: Post;
  postSubscription!: Subscription;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder,
     private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let paramsId = params.get('id');

      this.postSubscription = this.store.select(selectPostById, { id: paramsId }).subscribe((data) => {
        this.post = data!;

        this.createForm();
      });

    });
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: new FormControl(this.post.title, [
        Validators.required,
        //Validators.minLength(6)
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        //Validators.minLength(10)
      ])
    })
  }

  get registerFormControl() {
    return this.postForm.controls;
  }

  onEditPost() {
    if (!this.postForm.valid) {
      return;
    };

    let updatedPost: Post = {
      id: this.post.id,
      title: this.postForm.value.title,
      description: this.postForm.value.description
    };

    //post is the prop passed into the createAction, see post.action.ts
    this.store.dispatch(updatePost({ post: updatedPost }));

    this.router.navigate(['post-list']);

  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

}
