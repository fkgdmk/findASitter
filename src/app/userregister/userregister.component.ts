import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.scss']
})
export class UserregisterComponent implements OnInit {
  private registerForm: FormGroup;

  // DI - Dependency Injection
  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService, private usersService: UsersService) {
  }

  onSubmitRegister(registerForm) {
    // console.log(loginForm);
    // Send a request to the server
    // Try to login
    if (registerForm.valid) {
      // Send an http requestu
      let user: User = this.registerForm.value;
        
      this.usersService.createUser(user);
      } else {
        alert("Fill out all fields")
      }

      console.log("valid");
      this.authService.login().subscribe(() => {
        console.log("Now I am logged in!");
      })
      console.log("Before or after?");


      // this.router.navigate(['contact']); // Navigate
    } else {
      // Show errors and not send a request.
      alert("Fill out the fields, dummy! ")
    }
  }

  createForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required], 
    });
  }

  ngOnInit() {
    this.createForm();
  }

}
