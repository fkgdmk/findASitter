import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Baby } from "./entities/baby";
import { Sitter } from "./entities/sitter";
import { User } from "./entities/user";

@Injectable()
export class UsersService  {
    constructor (private http: HttpClient){}
    
    createBaby(baby: Baby) {
        baby.customerId = '4';
        return this.http.post("http://angular2api2.azurewebsites.net/api/internships", baby);
    }

    createUser(user: User) {
        return this.http.post("http://angular2api2.azurewebsites.net/api/internships", user)
    }
  
    getUsers() {
        return this.http.get("http://angular2api1.azurewebsites.net/api/internships/getall");
    }

    updateBaby (baby: Baby, id) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        const url = "http://angular2api2.azurewebsites.net/api/internships/" + id;
        return this.http.put(url, baby, httpOptions)
    }

    deleteBaby(baby: Baby) {
        
        const id : string = baby._id;
        const url = "http://angular2api2.azurewebsites.net/api/internships/" + id;
        console.log(url);
        return this.http.delete(url);
    }


}