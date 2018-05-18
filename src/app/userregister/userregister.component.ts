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
      console.log("Valid form");
      let user: User = this.registerForm.value;

      this.usersService.createUser(user).subscribe( x=> {
        console.log(user);
        console.log("Created user!");
        this.router.navigate(["/login"]);
      });
    } else {
      alert("Fill out all fields")
    }
      // this.router.navigate(['contact']); // Navigate
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required], 
    });
  }

  ngOnInit() {
    this.createForm();
  }

}
