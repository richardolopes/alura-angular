import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(user: string, password: string): Observable<any> {
    return this.http.post(URL + 'user/login', {
      userName: user,
      password
    })
  }
}
