import { UsersService } from '.././users.service';
import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { Baby } from '../entities/baby';
import { Sitter } from '../entities/sitter';
import { Router } from '@angular/router';
import { INITIAL_STATE, IAppState } from '../store';
import { NgRedux } from '@angular-redux/store';
import { REMOVE_BABY } from '../actions';

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

  constructor(private data: DataService, private usersService: UsersService, private router : Router, 
    private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    /*
    this.data.currentBaby.subscribe(baby => {
      this.baby = baby;
      console.log(baby);
    });*/
    //this.getUsers();

    // Somehow wait for dispatch fetching data from web API to finish?
    console.log(this.ngRedux.getState())
    this.babies = this.ngRedux.getState().babies;
    this.sitters = this.ngRedux.getState().sitters;

    this.spinner = false;
  }

  onBabyClicked(baby){
    console.log(baby);
  }

  deleteBaby(baby: Baby) {    
    //Redux
    this.ngRedux.dispatch({type: REMOVE_BABY, id: baby._id})

    //Old
    this.usersService.deleteBaby(baby).subscribe( x => {
      this.babies = this.babies.filter((b) => b._id !== baby._id)
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
