import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';
import { User } from '../entities/user';
import { Baby } from '../entities/baby';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ADD_USER } from '../actions';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.scss']
})
export class UserregisterComponent implements OnInit {
  private registerForm: FormGroup;
  private confirmPass: boolean;
  private spinner: boolean;
  private userCreated: boolean;

  // DI - Dependency Injection
  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService, private usersService: UsersService, private ngRedux: NgRedux<IAppState>) {
  }

  onSubmitRegister(registerForm) {
    // Send a request to the server
    // Try to login
    this.spinner = true;
    if (registerForm.valid) {
      // Send an http requestu
      let user: User = this.registerForm.value;
    
      let babyorsitterid = this.ngRedux.getState().babies[this.ngRedux.getState().babies.length-1]._id;
      user.babyorsitterid = babyorsitterid;

      this.usersService.createUser(user).subscribe( x=> {

        this.usersService.getUsers().subscribe( (result : any []) => {
          let foundUsers = result.filter( u => u.email === user.email);

          this.ngRedux.dispatch({type: ADD_USER, user: foundUsers[foundUsers.length-1]})
          this.spinner = false;
          this.router.navigate(["userlist"]);
        });
        console.log("Created user!");
      });
    } else {
      alert("Fill out all fields")
    }
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], 
      confirm: ['', Validators.required]
    }, {validator: this.checkIfMatchingPasswords('password', 'confirm')});
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];

      //If inputs is not equal set errors to true
      if (passwordInput.value !== passwordConfirmationInput.value) {
        this.confirmPass = false;
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      //If inputs is equal clear errors
      else {     
        this.confirmPass = true;
        return passwordConfirmationInput.setErrors(null);         
      }
    }
  }

  ngOnInit() {
    this.spinner = false;
    this.confirmPass = true;
    this.createForm();
  }

}
