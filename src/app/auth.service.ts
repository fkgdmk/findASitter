import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  private loggedInUser: any;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    // Make an http request, send username and password, get a user object back
    // from the server, and save the user object in this class
    return Observable.of(true).delay(1000).do(val => {
      // this.loggedInUser = //what came back from the server.
      this.isLoggedIn = true;
    });
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}