import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Baby } from '../entities/baby';
import { Sitter } from '../entities/sitter';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  private babies: Baby[];
  private sitters: Sitter[];
  constructor(private data: DataService) { }

  ngOnInit() {
    this.babies = this.data.getBabies();
    this.sitters = this.data.getSitters();
  }

  onBabyClicked(baby){
    console.log(baby);
  }

  deleteItem(item: Object, array: Object[]) {
    const index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  editItem(baby: Baby) {
    baby.firstname = 'test';
  }

}
