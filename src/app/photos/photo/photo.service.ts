import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Photo } from './photo';
import { PhotoComments } from './photo-comments';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    readonly endpoint = environment.api;

    constructor(private http: HttpClient) { }

    listFromUser(username: string, page: number): Observable<Photo[]> {
        const params = new HttpParams().append('page', page.toString());
        return this.http.get<Photo[]>(`${this.endpoint + username}/photos`, { params });
    }

    upload(description: string, allowComments: boolean, file: File) {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);

        return this.http.post(`${this.endpoint}photos/upload`, formData);
    }

    findById(id: number) {
        return this.http.get<Photo>(`${this.endpoint}photos/${id}`);
    }

    getComments(id: number) {
        return this.http.get<PhotoComments[]>(`${this.endpoint}photos/${id}/comments`);
    }

    addComment(id: number, comment: string) {
        return this.http.post(`${this.endpoint}photos/${id}/comments`, {
            commentText: comment
        })
    }

    removePhoto(id: number) {
        return this.http.delete(`${this.endpoint}photos/${id}`)
    }

    like(id: number) {
        return this.http.post(`${this.endpoint}photos/${id}/like`, {}, { observe: 'response' })
            .pipe(map(res => true))
            .pipe(catchError(err => {
                return err.status == '304' ? of(false) : throwError(err);
            }));
    }
}