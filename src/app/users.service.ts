import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Baby } from "./entities/baby";
import { Sitter } from "./entities/sitter";
import { User } from "./entities/user";

@Injectable()
export class UsersService  {
    constructor (private http: HttpClient){}
    loggedInUser: User;

    
    createBaby(baby: Baby) {
        baby.customerId = '4';
        return this.http.post("http://angular2api2.azurewebsites.net/api/internships", baby);
    }

    createUser(user: User) {
        user.customerId = '123user'
        user.babyorsitterid = ''
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
        console.log("hit");
        return this.http.get("http://angular2api1.azurewebsites.net/api/internships/getall");
    }

    updateBaby (baby: Baby, id) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        const url = "http://angular2api2.azurewebsites.net/api/internships/" + id;
        return this.http.put(url, baby, httpOptions)
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
        return this.http.delete(url);
    }


}