import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Baby, IBaby } from '../../entities/baby';
import { UsersService } from '../../users.service';
import { FormBuilder } from '@angular/forms';
import { UserlistComponent } from '../userlist.component';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { EDIT_BABY } from '../../actions';
import { Sitter, ISitter } from '../../entities/sitter';

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
  baby: IBaby;
  sitter: ISitter;
  babies: IBaby[];
  @Input() babyInput: IBaby;

  constructor(private fb: FormBuilder, 
    private usersService : UsersService, 
    private userlist: UserlistComponent, 
    private data: DataService, 
    private router: Router,
    private ngRedux: NgRedux<IAppState>) {
      this.editBabyForm = fb.group({
        firstname: [''],
          picture: [''],
          age: [''],
          postalCode: [''],
          gender: [''],
      })

      this.editSitterForm = this.fb.group({
        firstname: [''],
        lastname: [''],
        picture: [''],
        age: [''],
        region: [''],
        gender: [''],
        yearsOfExperience: [''],
        phone: [''],
      });
     }

  ngOnInit() {

    this.data.currentBaby.subscribe(baby => {
      this.baby = baby;
      if (baby != null) {
        this.editBabyForm = this.fb.group({
          firstname: [this.baby.firstname],
          picture: [''],
          age: [this.baby.age],
          postalCode: [this.baby.postalCode],
          gender: [this.baby.gender],
        });
      }
    });

    this.data.currentSitter.subscribe(sitter => {
      this.sitter = sitter;
      if (sitter != null) {
        this.editSitterForm = this.fb.group({
          firstname: [this.sitter.firstname],
          lastname: [this.sitter.lastname],
          picture: [''],
          age: [this.sitter.age],
          region: [this.sitter.region],
          gender: [this.sitter.gender],
          yearsOfExperience: [this.sitter.yearsOfExperience],
          phone: [this.sitter.phone],
        });
      }
    });
    
    this.data.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  onSubmit() {

    if (this.editBabyForm.valid && this.currentUser == 'baby') {
      this.baby.firstname = this.editBabyForm.value.firstname;
      this.baby.age = this.editBabyForm.value.age;
      this.baby.postalCode = this.editBabyForm.value.postalCode;
      this.baby.gender = this.editBabyForm.value.gender;
   
      this.usersService.updateBaby(this.baby, this.baby._id).subscribe();
      this.ngRedux.dispatch({type: EDIT_BABY, baby: this.baby})
      this.router.navigate(['userlist']);
    } 
    else if (this.editSitterForm.valid && this.currentUser == 'sitter') {
      this.sitter.firstname = this.editSitterForm.value.firstname;
      this.sitter.lastname = this.editSitterForm.value.lastname;
      this.sitter.picture = this.editSitterForm.value.picture;
      this.sitter.age = this.editSitterForm.value.age;
      this.sitter.gender = this.editSitterForm.value.gender;
      this.sitter.yearsOfExperience = this.editSitterForm.value.yearsOfExperience;
      this.sitter.region = this.editSitterForm.value.region;
      this.sitter.phone = this.editSitterForm.value.phone;

      this.usersService.updateSitter(this.sitter, this.sitter._id).subscribe(x => {
      });
      this.router.navigate(['userlist']);      
    }
  }
}
