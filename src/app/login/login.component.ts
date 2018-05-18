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
    // console.log(loginForm);
    // Send a request to the server
    // Try to login
    if (loginForm.valid) {
      // Send an http requestu
      console.log("valid");
      console.log(this.users[0].email);

      for (let i = 0; i < this.users.length; i++) {
        let element: User = this.users[i];
        console.log(this.users[i].email);
        console.log(this.users[i].password);
        console.log(loginForm.email);
        console.log(loginForm.password);
        if (element.email == loginForm.email) {
          if (element.password === loginForm.password) {
            this.authService.login().subscribe(() => {
              console.log("Now I am logged in!");
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
