import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Photo } from './photo';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    readonly endpoint = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    listFromUser(username: string, page: number): Observable<Photo[]> {
        const params = new HttpParams().append('page', page.toString());
        return this.http.get<Photo[]>(`${this.endpoint + username}/photos`, { params });
    }
}