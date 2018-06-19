import { UsersService } from '.././users.service';
import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { Baby, IBaby } from '../entities/baby';
import { User, IUser } from '../entities/user';
import { Sitter, ISitter } from '../entities/sitter';
import { Router } from '@angular/router';
import { INITIAL_STATE, IAppState } from '../store';
import { NgRedux, select } from '@angular-redux/store';
import { REMOVE_BABY, REMOVE_USER } from '../actions';
import { FilterBabies } from '../babies.filter';
import { FilterSitters } from '../sitters.filter';

@Component({
  selector: 'app-userlist', 
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})

@Injectable()
export class UserlistComponent implements OnInit {

  //Redux
  @select('babies') babies: IBaby[];

  //Old
  private sitters: ISitter[];
  private spinner: boolean;
  private showCards: boolean;
  private type: string;
  baby: Baby;


  constructor(private data: DataService, private usersService: UsersService, private router : Router, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.type = 'baby';
    this.data.currentBaby.subscribe(baby => {
      this.baby = baby;
    });
    this.getUsers(this.type);
    
    // Somehow wait for dispatch fetching data from web API to finish?
    //this.babies = this.ngRedux.getState().babies;
    this.sitters = this.ngRedux.getState().sitters;
  }

  onBabyClicked(baby) {
    console.log(baby);
  }

  deleteBaby(baby: Baby) {    
    let user : IUser 
    //Redux
    this.usersService.deleteBaby(baby).subscribe( () => {
      this.babies = this.babies.filter((b) => {
        if (b._id != null) {
          b._id !== baby._id
        } else {
          console.log("b_id is null.")
        }
      })
    })

    try {
      user = this.ngRedux.getState().users.find(user => user.babyorsitterid === baby._id);
    } catch (error) {
      console.log(error);
    }
    console.log("user", user);
    if (user) {
      console.log("test");
      this.usersService.deleteUser(user).subscribe();
      this.ngRedux.dispatch({type: REMOVE_USER, id: user._id});
    }

    this.ngRedux.dispatch({type: REMOVE_BABY, id: baby._id});
  }

  deleteSitter(sitter: Sitter) {
    this.usersService.deleteSitter(sitter).subscribe(x => {
      location.reload();
      console.log("slettet");
    });
  }

  editBaby(baby: Baby) {
    this.data.changeCurrentBaby(baby);
    this.data.changeCurrentUser("baby")
    this.router.navigate(['user']);
  }

  editSitter(sitter: Sitter) {
    this.data.changeCurrentSitter(sitter);
    this.data.changeCurrentUser("sitter")    
    this.router.navigate(['user']);
  }

  getUsers(type: string) {
    this.showCards = true;
    this.usersService.getUsers().subscribe((result: any[]) => {
      this.sitters = result.filter(sitter => sitter.customerId === '123sitter');
      this.spinner = false;
    });
  }
}