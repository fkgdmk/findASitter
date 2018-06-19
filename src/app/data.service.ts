import { Injectable } from '@angular/core';
import { Baby, IBaby } from './entities/baby';
import { Sitter, ISitter } from './entities/sitter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { ADD_BABIES } from './actions';

@Injectable()
export class DataService {
  
  baby : IBaby;
  sitter : ISitter;
  user : string;

  private babySource = new BehaviorSubject<IBaby>(this.baby);
  private sitterSource = new BehaviorSubject<ISitter>(this.sitter);
  private currentUserSource = new BehaviorSubject<string>(this.user);

  currentBaby = this.babySource.asObservable();
  currentSitter = this.sitterSource.asObservable();
  currentUser = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

  changeCurrentBaby (baby : IBaby) {
    this.babySource.next(baby);
  }

  changeCurrentSitter (sitter: ISitter) {
    this.sitterSource.next(sitter);
  }

  changeCurrentUser (user : string) {
    this.currentUserSource.next(user);
  }
}
