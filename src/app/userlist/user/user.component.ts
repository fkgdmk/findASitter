import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Baby } from '../../entities/baby';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() 
  babyInput: Baby;
  @Output()babyClicked:EventEmitter<any> = new EventEmitter<any>();

  constructor(private usersService : UsersService) { }

  ngOnInit() {
  }

  onBabyClick(baby: Baby){
    this.babyClicked.emit(baby);
  }

  deletebaby(baby: Baby) {
    this.usersService.deleteBaby(baby).subscribe;
  }

}
