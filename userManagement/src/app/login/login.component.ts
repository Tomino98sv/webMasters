import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/entities/auth';
import { UsersServerService } from 'src/services/users-server.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth = new Auth();
  token = '';
  alert = '';
  constructor(private usersServerService: UsersServerService) { }

  ngOnInit() {
  }

  get vypisAuth(): string {
    return JSON.stringify(this.auth);
   }

  setName(event: any) {
    this.auth.name = event.target.value;
  }

  onSubmit() {
    this.usersServerService.login(this.auth)
    .subscribe(success => {
      if(success){
        console.log('login successfully');
      } else {
        this.alert = 'Zli login alebo heslo';
      }
    },
    error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          this.alert = 'Server je nedostupný';
        }
      }
    });
  }
}
