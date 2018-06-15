import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Baby } from '../../entities/baby';
import { UsersService } from '../../users.service';
import { FormBuilder } from '@angular/forms';
import { UserlistComponent } from '../userlist.component';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { Sitter } from '../../entities/sitter';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private editBabyForm;
  private editSitterForm;
  private id: number;
  private currentUser: string;
  baby: Baby;
  sitter: Sitter;
  babies: Baby[];
  @Input() babyInput: Baby;

  constructor(private fb: FormBuilder, private usersService: UsersService, private userlist: UserlistComponent, private data: DataService, private router: Router) { }

  ngOnInit() {

    this.data.currentBaby.subscribe(baby => {
      this.baby = baby;
    });

    this.data.currentSitter.subscribe(sitter => {
      this.sitter = sitter;
    });

    this.data.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
    });


    if (this.currentUser === 'baby') {
      this.editBabyForm = this.fb.group({
        firstname: [this.baby.firstname],
        picture: [''],
        age: [this.baby.age],
        postalCode: [this.baby.postalCode],
        gender: [this.baby.gender],
      });
    }

    console.log(this.sitter)

    if (this.currentUser === 'sitter') {
      this.editSitterForm = this.fb.group({
        firstname: [this.sitter.firstname],
        lastname: [this.sitter.lastname],
        picture: [this.sitter.picture],
        age: [this.sitter.age],
        gender: [this.sitter.gender],
        yearsOfExperience: [this.sitter.yearsOfExperience],
        region: [this.sitter.region],
        phone: [this.sitter.phone],
      });
    }

  }

  onSubmit() {

    if (this.editBabyForm.valid && this.currentUser == 'baby') {
      this.baby.firstname = this.editBabyForm.value.firstname;
      this.baby.age = this.editBabyForm.value.age;
      this.baby.postalCode = this.editBabyForm.value.postalCode;
      this.baby.gender = this.editBabyForm.value.gender;
      this.usersService.updateBaby(this.baby, this.baby._id).subscribe(x => {
        console.log("updated");
      });
      this.router.navigate(['userlist']);
    } else if (this.editSitterForm.valid && this.currentUser == 'sitter') {
      console.log("test");
      alert("test");
      this.sitter.firstname = this.editSitterForm.value.firstname;
      this.sitter.lastname = this.editSitterForm.value.lastname;
      this.sitter.picture = this.editSitterForm.value.picture;
      this.sitter.age = this.editSitterForm.value.age;
      this.sitter.gender = this.editSitterForm.value.gender;
      this.sitter.yearsOfExperience = this.editSitterForm.value.yearsOfExperience;
      this.sitter.region = this.editSitterForm.value.region;
      this.sitter.phone = this.editSitterForm.value.phone;

      this.usersService.updateSitter(this.sitter, this.sitter._id).subscribe(x => {
        console.log("upd");
      });
      this.router.navigate(['userlist']);      
    }
  }



  // onBabyClick(baby: Baby){
  //   this.babyClicked.emit(baby);
  // }

}
