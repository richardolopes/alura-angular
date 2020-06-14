import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';
import { environment } from 'src/environments/environment';

const API = environment.api;

@Injectable()
export class SignUpService {

  constructor(private http: HttpClient) { }

  checkUserNameTaken(user: string) {
    return this.http.get(API + 'user/exists/' + user)
  }

  signup(user: NewUser) {
    return this.http.post(API + 'user/signup', user);
  }
}
