import { Injectable } from '@angular/core';
import { Baby } from './entities/baby';
import { Sitter } from './entities/sitter';

@Injectable()
export class DataService {
  
  constructor() { }

  private babies: Baby[] = [
    {
      id: 1,
      firstname: 'Oliver', 
      postalCode: '2920', 
      picture: 'no picture yet', 
      age: 8,
      gender: "Male"
    },
    {
      id: 2,
      firstname: 'Carla', 
      postalCode: '1324', 
      picture: 'no picture yet', 
      age: 24,
      gender: "Female"
    },
  ];

  private sitters: Sitter[] = [
    {
      id: 1,
      firstname: 'Bob',
      lastname: 'Alisan',
      age: 16,
      yearsOfExperience: 0,
      region: 'Greater Copenhagen',
      picture: 'not yet',
      gender: 'Male',
      phone: '12345678'
    },
    {
      id: 2,
      firstname: 'Christian',
      lastname: 'Kirschberg',
      age: 29,
      yearsOfExperience: 8,
      region: 'Greater Copenhagen',
      picture: 'not yet',
      gender: 'Male',
      phone: '87654321'
    },
  ];


  addBaby(baby: Baby) {
    this.babies.push(baby);
    console.log(this.babies);
  }

  addSitter(sitter: Sitter) {
    this.sitters.push(sitter);
    console.log(this.sitters);
  }

  getBabies(): Baby[] {
    return this.babies;
  }

  getSitters(): Sitter[] {
    return this.sitters;
  }

}
