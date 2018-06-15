import { UsersService } from './users.service';
import { FilterBabies } from './babies.filter';
import { DataService } from './data.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule} from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard';
import { AuthService } from './auth.service';
import { UserlistComponent } from './userlist/userlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  MatButtonModule, 
  MatCheckboxModule, 
  MatFormFieldModule,
  MatInputModule, 
  MatToolbarModule,
  MatRadioModule,
  MatCardModule,
  MatIconModule,
} from '@angular/material';

// Activating the store with a state (imports)
import { NgRedux, NgReduxModule } from "@angular-redux/store";
import { IAppState, rootReducer, INITIAL_STATE } from "./store";

import { UserComponent } from './userlist/user/user.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LandingComponent } from './landing/landing.component';
import { UserregisterComponent } from './userregister/userregister.component';

import { IBaby } from './entities/baby';
import { ISitter } from './entities/sitter';
import { IUser } from './entities/user';
import { ADD_BABY, ADD_BABIES } from './actions';
import { DatabaseService } from './database.service';
import { reducer } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactComponent,
    RegisterComponent,
    PageNotFoundComponent,
    UserlistComponent,
    UserComponent,
    FilterBabies,
    LandingComponent,
    UserregisterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    NgReduxModule,
    [
      BrowserAnimationsModule
    ],
    [
      MatButtonModule, 
      MatCheckboxModule,
      MatFormFieldModule,
      MatInputModule,
      MatToolbarModule,
      MatRadioModule,
      MatCardModule,
      MatIconModule
    ], 
  ],
  providers: [AuthGuard, AuthService, DataService, UsersService, HttpClientModule, UserlistComponent, DatabaseService],
  bootstrap: [AppComponent]
})

export class AppModule {
  // Activating the store with a state (constructor injection)
  constructor(ngRedux: NgRedux<IAppState>, http: HttpClient, database: DatabaseService) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
    ngRedux.subscribe(() => {
      console.log("> State changed <");
    })

    database.fetchBabies();
    database.fetchUsers();
    database.testDispatches();
  }
 }