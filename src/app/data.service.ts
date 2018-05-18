import { Injectable } from '@angular/core';
import { Baby } from './entities/baby';
import { Sitter } from './entities/sitter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  
  baby : Baby;
  private babySource = new BehaviorSubject<Baby>(this.baby);
  currentBaby = this.babySource .asObservable();

  constructor() { }

  changeCurrentBaby (baby : Baby) {
     this.babySource.next(baby);
  }

}
