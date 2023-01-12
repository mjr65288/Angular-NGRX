import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

//importing the store
import { appReducer } from './store/app.state';

import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';

import { AddPostComponent } from './components/add-post/add-post.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PostListComponent } from './components/post-list/post-list.component';

import { AppRoutingModule } from './app-routing.module';
import { EditPostComponent } from './components/edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    AddPostComponent,
    HeaderComponent,
    HomeComponent,
    PostListComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    //Binding the store.The store contains only a single reducer
    StoreModule.forRoot(
      //{count: counterReducer,}
      appReducer
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
