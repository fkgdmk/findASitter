import { UsersService } from '.././users.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Baby } from '../entities/baby';
import { Sitter } from '../entities/sitter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})

@Injectable()
export class UserlistComponent implements OnInit {

  private babies: Baby[];
  private sitters: Sitter[];
  private spinner: boolean;
  private showCards: boolean;
  baby: Baby;

  constructor(private data: DataService, private usersService: UsersService, private router : Router) { }

  ngOnInit() {
    this.data.currentBaby.subscribe(baby => {
      this.baby = baby;
      console.log(baby);
    });
    this.getUsers();

  }

  onBabyClicked(baby){
    console.log(baby);
  }

  deleteBaby(baby: Baby) {
    console.log(baby);
    this.usersService.deleteBaby(baby).subscribe( x => {
      location.reload();
    });
  }

  editBaby(baby: Baby) {
    console.log(baby)
    this.data.changeCurrentBaby(baby);
    //this.currentBaby = baby;
    this.router.navigate(['user']);
  }

  getUsers () {
    this.showCards = true;
    this.spinner = true;
    this.usersService.getUsers().subscribe( (result : any[]) => {
      this.babies = result.filter(baby => baby.customerId === '4'); 
      console.log(this.babies);
      this.spinner = false;
    });
  }


}
