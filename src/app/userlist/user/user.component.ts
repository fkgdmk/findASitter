import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Baby } from '../../entities/baby';
import { UsersService } from '../../users.service';
import { FormBuilder } from '@angular/forms';
import { UserlistComponent } from '../userlist.component';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private editBabyForm;
  baby: Baby;
  babies: Baby [];
  @Input() babyInput: Baby;

  // @Input() 
  // babyInput: Baby;
  // @Output()babyClicked:EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private usersService : UsersService, private userlist: UserlistComponent, private data: DataService, private router: Router) { }

  ngOnInit() {

    this.data.currentBaby.subscribe(baby => {
      this.baby = baby;
    });

    this.editBabyForm = this.fb.group({
      firstname: [this.baby.firstname],
      picture: [''],
      age: [this.baby.age],
      postalCode: [this.baby.postalCode],
      gender: [this.baby.gender],
    });

  }

  onSubmit(){

    if (this.editBabyForm.valid){

      this.baby.firstname = this.editBabyForm.value.firstname;
      this.baby.age = this.editBabyForm.value.age;
      this.baby.postalCode = this.editBabyForm.value.postalCode;
      this.baby.gender = this.editBabyForm.value.gender;
      this.usersService.updateBaby(this.baby, this.baby._id).subscribe(x => {
        console.log("updated");
      });
      this.router.navigate(['userlist']);
    }
  }



  // onBabyClick(baby: Baby){
  //   this.babyClicked.emit(baby);
  // }

}
