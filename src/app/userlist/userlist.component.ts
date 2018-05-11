import { UsersService } from '.././users.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Baby } from '../entities/baby';
import { Sitter } from '../entities/sitter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  private babies: Baby[];
  private sitters: Sitter[];
  private spinner: boolean;

  constructor(private data: DataService, private usersService: UsersService, private router : Router) { }

  ngOnInit() {
    this.spinner = true;
    this.usersService.getUsers().subscribe( (result : any[]) => {
      this.babies = result.filter(baby => baby.customerId === '4'); 
      console.log(this.babies);
      this.spinner = false;
    });

    this.sitters = this.data.getSitters();
  }

  onBabyClicked(baby){
    console.log(baby);
  }

  deleteBaby(baby: Baby) {
    console.log(baby);
    this.usersService.deleteBaby(baby).subscribe( x => {
        this.router.navigate(['userlist']);
    });
  }

  editItem(baby: Baby) {
    baby.firstname = 'test';
  }

}
