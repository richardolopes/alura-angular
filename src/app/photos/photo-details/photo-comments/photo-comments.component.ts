import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoComments } from '../../photo/photo-comments';
import { PhotoService } from '../../photo/photo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: [
    './photo-comments.component.css'
  ]
})
export class PhotoCommentsComponent implements OnInit {
  @Input() id: number;
  comments$: Observable<PhotoComments[]>
  commentForm: FormGroup;

  constructor(private photoService: PhotoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.id);
    this.commentForm = this.formBuilder.group({
      comment: ['', [
        Validators.maxLength(300),
      ]]
    });
  }

  save() {
    const comment = this.commentForm.get('comment').value as string;
    this.comments$ = this.photoService
      .addComment(this.id, comment)
      .pipe(switchMap(() => this.photoService.getComments(this.id)))
      .pipe(tap(() => this.commentForm.reset()))
  }

}
