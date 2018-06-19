import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { UsersService } from './users.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { DatabaseService } from './database.service';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private ngRedux: NgRedux<IAppState>, private database: DatabaseService) {

  }

  isLoggedIn = false;
  private loggedInUser: any;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(user): Observable<boolean> {
    // Make an http request, send username and password, get a user object back
    // from the server, and save the user object in this class
    return Observable.of(true).delay(1000).do(val => {
      // this.loggedInUser = //what came back from the server.
      this.usersService.loggedInUser = user;
      this.usersService.isUserLoggedIn = true;
      this.isLoggedIn = true;

      this.database.login(user, user.babyorsitterid);
    });
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}