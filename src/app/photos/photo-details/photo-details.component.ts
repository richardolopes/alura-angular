import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { PhotoComments } from '../photo/photo-comments';

@Component({
  templateUrl: './photo-details.component.html',
})
export class PhotoDetailsComponent implements OnInit {
  photo$: Observable<Photo>;
  id: number;

  constructor(private route: ActivatedRoute, private photoService: PhotoService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(this.id);
  }

}
