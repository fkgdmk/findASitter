import { Injectable } from '@angular/core';
import { Baby } from './entities/baby';
import { Sitter } from './entities/sitter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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

  constructor() { }

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
