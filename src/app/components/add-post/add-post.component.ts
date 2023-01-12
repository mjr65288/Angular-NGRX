import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Post } from '../../store/models/post.model'
import { AppState } from '../../store/app.state';
import { addPost } from '../../store/actions/post.action';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: new FormControl (null, [
        Validators.required,
        //Validators.minLength(6)
      ]),
      description: new FormControl(null, [
        Validators.required,
        //Validators.minLength(10)
      ])
    })
  }

  get registerFormControl() {
    return this.postForm.controls;
  }

  onAddPost(){
    if(!this.postForm.valid){
      return;
    };

    let newPost: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    };

    //post is the prop passed into the createAction, see post.action.ts
    this.store.dispatch(addPost({post: newPost}))

  }

}
