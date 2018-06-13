import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAppState } from "./store";
import { ADD_BABIES, REMOVE_BABY, ADD_BABY } from "./actions";
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

    testDispatches() {
        console.log("Testing dispatches: ")
        this.ngRedux.dispatch({type: ADD_BABY, baby: {
            customerId: 4,
            firstname: "Jakob",
            postalCode: 2860,
            picture: "none",
            age: 12, // months
            gender: "Male"
        }})
        
        this.ngRedux.dispatch({type: ADD_BABY, baby: {
            customerId: 4,
            firstname: "Jakobi",
            postalCode: 2860,
            picture: "none",
            age: 14, // months
            gender: "Male"
        }})
    }
    
    testDelete() {
        this.ngRedux.dispatch({type: REMOVE_BABY, id: "5afecfc15cb6ed742ba36e71"})
    }
}

