import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  private isUserLoggedIn : boolean;
  
  constructor(private usersService: UsersService) { }
  
  ngOnInit() {

    if (this.usersService.isUserLoggedIn) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
    console.log(this.isUserLoggedIn);
  }



}
