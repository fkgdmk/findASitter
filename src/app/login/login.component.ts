import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../entities/user';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, INITIAL_STATE } from '../store';
import { FETCH_DATA, LOGIN } from '../actions';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private spinner: boolean;

  //Redux
  @select('users') users;

  // DI - Dependency Injection
  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService, private usersService: UsersService,
    private database: DatabaseService,
    private ngRedux: NgRedux<IAppState>, private http: HttpClient) {
  }

  onSubmitLogin(loginForm) {
    // Try to login
    if (loginForm.valid) {
      this.spinner = true;
      console.log("Valid form");

      // Update users because this component was loaded before the users were updated     
      let userList = this.ngRedux.getState().users;
      let match: boolean = false;

      for (let i = 0; i < userList.length; i++) {
        let user: User = userList[i];
        if (user.email == loginForm.value.username) {
          if (user.password === loginForm.value.password) {
            match = true;
            this.authService.login(user).subscribe(() => {
              console.log("Now I am logged in!");

              // Hacky fix to wait for the redux subject to update
              setTimeout(() => {
                this.spinner = false;
                this.router.navigate(['profile'])}, 1500);
            })
          }
        }
      }
      if (!match) {
        alert("Login is incorrect")
      }
    } else {
      // Show errors and not send a request.
      alert("Fill out the fields, dummy! ")
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required], 
    });
  }  

  // getUsers () {
  //   this.usersService.getUsers().subscribe( (result : any[]) => {
  //     this.users = result.filter(user => user.customerId === '123user'); 
  //     console.log(this.users);
  //     console.log("Hello!")
  //   });
  // }

  fetchUsers() {
    this.ngRedux.dispatch({type: FETCH_DATA, http: this.http})
  }

  ngOnInit() {
    this.spinner = false;
    this.createForm();
    this.fetchUsers();
  }

}
