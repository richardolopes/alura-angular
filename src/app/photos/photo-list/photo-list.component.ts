import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  filter = '';
  hasMore = true;
  currentPage = 1;
  user = '';

  constructor(private activatedRoute: ActivatedRoute, private photoService: PhotoService) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.params.user;
    this.photos = this.activatedRoute.snapshot.data.photos;
  }

  load(): void {
    this.photoService.listFromUser(this.user, ++this.currentPage).subscribe(
      photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);

        if (!photos.length) {
          this.hasMore = false;
        }
      }
    );
  }
}
