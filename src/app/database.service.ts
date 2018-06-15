import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAppState } from "./store";
import { ADD_BABIES, REMOVE_BABY, ADD_BABY, ADD_USERS } from "./actions";
import { NgRedux } from "@angular-redux/store";

@Injectable()
export class DatabaseService {
    constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

    fetchBabies() {
        this.http.get("http://angular2api1.azurewebsites.net/api/internships/getall").subscribe( (result : any[]) => {
            let babies = result.filter(baby => baby.customerId === '4');
            console.log("Got babies: ");
            console.log(babies);
            this.ngRedux.dispatch({type: ADD_BABIES, babies: babies})
          });;
      }

    fetchUsers() {
        this.http.get("http://angular2api1.azurewebsites.net/api/internships/getall").subscribe( (result : any[]) => {
            let users = result.filter(user => user.customerId === '123user');
            console.log("Got users: ");
            console.log(users);
            this.ngRedux.dispatch({type: ADD_USERS, users: users})
          });;
    }

    testDispatches() {
        console.log("Testing dispatches: ")
        this.ngRedux.dispatch({type: ADD_BABY, baby: {
            _id: 9,
            customerId: 4,
            firstname: "Jakob",
            postalCode: 2860,
            picture: "none",
            age: 12, // months
            gender: "Male"
        }})
        
        this.ngRedux.dispatch({type: ADD_BABY, baby: {
            _id: 8,
            customerId: 4,
            firstname: "Jakobi",
            postalCode: 2860,
            picture: "none",
            age: 14, // months
            gender: "Male"
        }})
    }
}

