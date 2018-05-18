import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private users: User[];

  // DI - Dependency Injection
  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService, private usersService: UsersService) {
  }

  onSubmitLogin(loginForm) {
    console.log("Login form:");
    console.log(loginForm);

    // Send a request to the server
    // Try to login
    if (loginForm.valid) {
      // Send an http requestu
      console.log("valid");

      for (let i = 0; i < this.users.length; i++) {
        let element: User = this.users[i];
        if (element.email == loginForm.value.username) {
          if (element.password === loginForm.value.password) {
            this.authService.login().subscribe(() => {
              console.log("Now I am logged in!");
              this.usersService.loggedInUser = element;
            })
          }
        }
      }
      console.log("Before or after?");


      // this.router.navigate(['contact']); // Navigate
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

  getUsers () {
    this.usersService.getUsers().subscribe( (result : any[]) => {
      this.users = result.filter(user => user.customerId === '123user'); 
      console.log(this.users);
    });
  }

  ngOnInit() {
    this.createForm();
    this.getUsers();
  }

}
