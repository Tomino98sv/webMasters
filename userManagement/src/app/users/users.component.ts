import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { UsersServerService } from 'src/services/users-server.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title = 'Zoznam používateľov';
  users = [
    new User('Martin', 'martin@jano.sk'),
    new User(
      'Klaudia',
      'klaudia@gmail.com',
      undefined,
      new Date('2019-10-04T11:30:00'),
      'somdoma'
    )
  ];
  selectedUser: User = null;
  alert = null;
  //users$: Observable<Array<User>>;

  constructor(private usersServerService: UsersServerService) {}

  ngOnInit() {
    this.updateUsers();
    //this.users$ = this.usersServerService.getUsers();
  }

  updateUsers() {
    this.usersServerService.getUsers().subscribe(
      (u: Array<User>) => (this.users = u),
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.alert = 'Server je nedostupný';
          }
        }
        console.error(JSON.stringify(error));
      }
    );
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }
}
