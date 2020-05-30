import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo/photo.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[];

  constructor(private service: PhotoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const user = this.activatedRoute.snapshot.params.user;

    this.service
      .listFromUser(user)
      .subscribe(photos => this.photos = photos);
  }
}
