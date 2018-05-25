import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http"
import { Baby } from "./entities/baby";
import { Sitter } from "./entities/sitter";
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UsersService  {
    constructor (private http: HttpClient){}
    
    createBaby(baby: Baby) {
        baby.customerId = '123baby';
        return this.http.post("http://angular2api2.azurewebsites.net/api/internships", baby);
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

    deleteBaby(baby: Baby): Observable<{}> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        const id : string = baby._id;
        const url = "http://angular2api2.azurewebsites.net/api/internships/" + id;
        return this.http.delete(url, httpOptions)
            // .pipe(
            //     catchError(this.handleError(deleteBaby))
            // );
    }

    createSitter(sitter : Sitter) {
        sitter.customerId = '123sitter';
        return this.http.post("http://angular2api2.azurewebsites.net/api/internships", sitter);
    }

    updateSitter (sitter: Sitter, id) {
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