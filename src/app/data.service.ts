import { Injectable } from '@angular/core';
import { Baby } from './entities/baby';
import { Sitter } from './entities/sitter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { ADD_BABIES } from './actions';

@Injectable()
export class DataService {
  
  baby : Baby;
  sitter : Sitter;
  user : string;
  private babySource = new BehaviorSubject<Baby>(this.baby);
  private sitterSource = new BehaviorSubject<Sitter>(this.sitter);
  private currentUserSource = new BehaviorSubject<string>(this.user);
  currentBaby = this.babySource.asObservable();
  currentSitter = this.sitterSource.asObservable();
  currentUser = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

  getBabies() {
    this.http.get("http://angular2api1.azurewebsites.net/api/internships/getall").subscribe( (result : any[]) => {
        let babies = result.filter(baby => baby.customerId === '4');
        console.log("Got babies: ");
        console.log(babies);
        this.ngRedux.dispatch({type: ADD_BABIES, babies: babies})
      });;
  }

  changeCurrentBaby (baby : Baby) {
    this.babySource.next(baby);
  }

  changeCurrentSitter (sitter: Sitter) {
    this.sitterSource.next(sitter);
  }

  changeCurrentUser (user : string) {
    this.currentUserSource.next(user);
  }

}
