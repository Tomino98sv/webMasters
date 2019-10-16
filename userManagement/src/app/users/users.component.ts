import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title= 'Management users';
  users = [new User('Janko','Jano@jano.sk',undefined,undefined, "581"),
  new User('Martin','Jano@jano.sk'),
  new User('Klaudia','Klaudia@gmail.com', 2, new Date('2019-10-04T11:30:00'), '*****')
  ];

  selectedUser : User = null;

  constructor() { }

  selectUser(user: User) : void {
    this.selectedUser = user;
  }

  toSkDate(date:Date):string{
    const options = {
      weekday : 'long',
      year:'numeric',
      moth:'long',
      day:'numeric',
      timeStyle:'long'
    }

    return date ? date.toLocaleTimeString('sk-SK', options) : '';
  }


  ngOnInit() {
  }

}
