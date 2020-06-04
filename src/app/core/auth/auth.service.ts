import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from '../token/token.service';

const URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private token: TokenService) { }

  authenticate(user: string, password: string): Observable<any> {
    return this.http.post(URL + 'user/login', {
      userName: user,
      password
    }, { observe: 'response' })
      .pipe(tap(res => {
        const token = res.headers.get('x-access-token');
        this.token.setToken(token);
      }))
  }
}
