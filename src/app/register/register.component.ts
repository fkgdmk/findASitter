import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Baby } from '../entities/baby';
import { Sitter } from '../entities/sitter';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { UsersService } from '../users.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  private registerForm;
  private registerBabyForm;
  private registerSitterForm;
  registrant: string;
  visible: boolean;
  userCreated: boolean;
  spinner: boolean;

  constructor(private data: DataService, private fb: FormBuilder, private router: Router, private usersService : UsersService) { }

  ngOnInit() {
    this.userCreated = false;
    this.spinner = false; 

    this.registerBabyForm = this.fb.group({
      firstname: [''],
      postalCode: [''],
      picture: [''],
      age: [''],
      gender: [''],
    });

    this.registerSitterForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      postalCode: [''],
      picture: [''],
      age: [''],
      gender: [''],
      yearsOfExperience: [''],
      region: [''],
      phone: [''],
    });
  }

  onSubmit() {
    if (this.registerBabyForm.valid) {
      this.spinner = true;
      let baby: Baby = this.registerBabyForm.value;
      let foundBabies: Baby[];
      
      this.usersService.createBaby(baby).subscribe( x=> {
        this.userCreated = true;
        this.spinner = false;

        console.log(this.usersService.loggedInUser.email);           
        this.clearForm();

        this.usersService.updateUser(this.usersService.loggedInUser, "123baby");

        this.usersService.getUsers().subscribe( (result : any[]) => {
          foundBabies = result.filter(aBaby => aBaby.firstname === baby.firstname); 
          console.log(foundBabies);
          this.usersService.updateBabyUser(foundBabies[0]);
        });
      });

    } else {
      alert("Fill out all fields")
    }

    if (this.registrant === 'sitter') {

    }
    
    //this.router.navigate(['userlist']);
  }

  clearForm() {
    this.registerBabyForm.reset({
      firstname: [''],
      lastname: [''],
      postalCode: [''],
      picture: [''],
      age: [''],
      gender: [''],
      yearsOfExperience: [''],
      region: [''],
      phone: [''],
    });
  }
}
