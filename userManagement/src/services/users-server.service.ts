import { Injectable } from '@angular/core';
import { User } from 'src/entities/user';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth } from 'src/entities/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersServerService {
  url = 'http://192.168.2.88:8080/';
  token: string = null;
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

  login(auth: Auth): Observable<boolean> {
    return this.http.post(this.url + 'login', auth, {responseType : 'text'}).pipe(map(token => {
      this.token = token;
      return true;
    }),
    catchError(error => {
      if(error instanceof HttpErrorResponse && error.status === 401) {
        return of(false);
      }
      return throwError(error);
    })
    );
  }
}
