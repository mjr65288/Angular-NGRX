import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GalleryService } from './gallery.service';
import { retrievedGalleryList, invokeGalleryAPI } from '../store/gallery.action';
import {
  uniqueAlbumIds,
  albumCollectionByAlbumId,
} from '../store/gallery.selector';
import { GalleryModel } from './gallery.model';

@Component({
  templateUrl: './gallery.component.html',
  selector: 'gallery',
})
export class GalleryComponent {

}
