import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Baby } from '../entities/baby';
import { Sitter } from '../entities/sitter';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';



@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  private registerForm;
  registrant: string;
  visible: boolean;

  constructor(private data: DataService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      sitter: [''],
      baby: [''],
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

  onSubmit(registerForm) {
    console.log(this.registrant);
    if (this.registrant === 'baby') {
      const baby: Baby = registerForm.value;
      this.data.addBaby(baby);
      console.log(baby);
    } else {
     const sitter: Sitter = registerForm.value;
      this.data.addSitter(sitter);
    }
    this.router.navigate(['userlist']);
  }
}
