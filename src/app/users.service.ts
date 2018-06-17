import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http"
import { Baby } from "./entities/baby";
import { Sitter, ISitter } from "./entities/sitter";
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { User } from "./entities/user";

@Injectable()
export class UsersService  {
    constructor (private http: HttpClient){}
    loggedInUser: User;
    
    createBaby(baby: Baby) {
        baby.customerId = '123baby';
        return this.http.post("http://angular2api2.azurewebsites.net/api/internships", baby);
    }

    createUser(user: User) {
        user.customerId = '123user'
        return this.http.post("http://angular2api2.azurewebsites.net/api/internships", user)
    }

    updateUser(user: User, roleId: string) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        let newUser = user;
        newUser.babyorsitterid = roleId;
        const url = "http://angular2api2.azurewebsites.net/api/internships/" + user._id;
        return this.http.put(url, newUser, httpOptions);
    }
  
    getUsers() {
        return this.http.get("http://angular2api1.azurewebsites.net/api/internships/getall");
    }

    updateBaby (baby: Baby, id) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        const url = "http://angular2api2.azurewebsites.net/api/internships/" + id;
        return this.http.put(url, baby)
    }   

    updateBabyUser (baby: Baby) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        let newBaby = baby;
        newBaby.userId = this.loggedInUser._id;
        console.log("newBaby: ");
        console.log(newBaby);
        const url = "http://angular2api2.azurewebsites.net/api/internships/" + this.loggedInUser._id;
        return this.http.put(url, newBaby, httpOptions)
    }

    deleteBaby(baby: Baby) {
        const id : string = baby._id;
        const url = "http://angular2api2.azurewebsites.net/api/internships/" + id;
        return this.http.delete(url)
    }

    createSitter(sitter : Sitter) {
        sitter.customerId = '123sitter';
        return this.http.post("http://angular2api2.azurewebsites.net/api/internships", sitter);
    }

    updateSitter (sitter: ISitter, id) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        const url = "http://angular2api2.azurewebsites.net/api/internships/" + id;
        return this.http.put(url, sitter, httpOptions)
    }

    deleteSitter(sitter: Sitter) {      
        const id : string = sitter._id;
        const url = "http://angular2api2.azurewebsites.net/api/internships/" + id;
        return this.http.delete(url);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }

        return Observable.throw("error");
    };
        // return an observable with a user-facing error message
}