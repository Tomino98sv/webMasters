import { Injectable } from '@angular/core';
import { User } from 'src/entities/user';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersServerService {
  url = 'http://localhost:8080/';

  users = [
    new User('JanoService', 'jano@jano.sk', 1),
    new User('MartinService', 'martin@jano.sk'),
    new User(
      'KlaudiaService',
      'klaudia@gmail.com',
      undefined,
      new Date('2019-10-04T11:30:00'),
      'somdoma'
    )
  ];

  constructor(private http: HttpClient) {}

  getLocalUsers(): Observable<Array<User>> {
    return of(this.users);
  }

  getUsers(): Observable<Array<User>> {
    return this.http
      .get(this.url + 'users')
      .pipe(map(jsonObj => this.fromJsonToListUsers(jsonObj)));
  }

  private fromJsonToListUsers(jsonObject: any): Array<User> {
    const users: Array<User> = [];
    for (const user of jsonObject) {
      users.push(new User(user.name, user.email, user.id));
    }
    return users;
  }
}
