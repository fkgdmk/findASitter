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
  private type: string;
  baby: Baby;

  constructor(private data: DataService, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.type = 'baby';
    this.data.currentBaby.subscribe(baby => {
      this.baby = baby;
      console.log(baby);
    });
    this.getUsers(this.type);
  }

  onBabyClicked(baby) {
    console.log(baby);
  }

  deleteBaby(baby: Baby) {
    this.usersService.deleteBaby(baby).subscribe(x => {
      location.reload();
    });
  }

  deleteSitter(sitter: Sitter) {
    this.usersService.deleteSitter(sitter).subscribe(x => {
      location.reload();
      console.log("slettet");
    });
  }

  editBaby(baby: Baby) {
    console.log(baby)
    this.data.changeCurrentBaby(baby);
    //this.currentBaby = baby;
    this.router.navigate(['user']);
  }

  getUsers(type: string) {
    this.showCards = true;
    this.spinner = true;
    this.usersService.getUsers().subscribe((result: any[]) => {
      this.babies = result.filter(baby => baby.customerId === '123baby');
      console.log(this.babies);
      this.spinner = false;

      this.sitters = result.filter(sitter => sitter.customerId === '123sitter');
      console.log(this.sitters);
      this.spinner = false;

    });
  }


}
