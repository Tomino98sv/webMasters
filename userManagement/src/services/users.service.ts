import { Injectable } from '@angular/core';
import { User } from 'src/entities/user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = "http://192.168.2.88:8080/";
  users = [
  ];

  constructor(private http: HttpClient) { }

  getLocalUsers(): Observable<Array<User>> {
    return of(this.users); 
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get(this.url + 'users')
    .pipe(map(jsonObj => this.fromJsonToListUsers(jsonObj)));
  }

  private fromJsonToListUsers(jsonObject:any):Array<User> {
    const users:Array<User> = [];
    for(const user of jsonObject) {
      users.push(new User(user.name, user.email, user.id));
    }
    return users;
  }
}
