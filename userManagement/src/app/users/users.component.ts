import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { UsersService } from 'src/services/users.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title = 'Management users';
  users = [
  new User('Martin' , 'Jano@jano.sk'),
  new User('Klaudia' , 'Klaudia@gmail.com', 2, new Date('2019-10-04T11:30:00'), '*****')
  ];

  selectedUser: User = null;
  alert = null;
  // users$:Observable<Array<User>>;

  constructor(private usersService: UsersService) { }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  ngOnInit() {
    // this.updateUsers();
    // this.users$=this.usersService.getUsers();
  }

  updateUsers(){
    this.usersService.getUsers().subscribe((u: Array<User>) => 
        (u:Array<User>) => (this.users = u),
        error => {
          if(error instanceof HttpErrorResponse){
            if(error.status === 0){
                this.alert="Server nedostupny";
            }
          }
          console.error(JSON.stringify(error))
        }
    );
  }

}
