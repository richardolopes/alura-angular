import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';

const URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) { }

  authenticate(user: string, password: string): Observable<any> {
    return this.http.post(URL + '/user/login', {
      userName: user,
      password
    }, { observe: 'response' })
      .pipe(tap(res => {
        const token = res.headers.get('x-access-token');
        this.userService.setToken(token);
      }))
  }
}
