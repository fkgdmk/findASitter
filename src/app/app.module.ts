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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { UserComponent } from './userlist/user/user.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactComponent,
    RegisterComponent,
    PageNotFoundComponent,
    UserlistComponent,
    FilterBabies,
    LandingComponent,
    UserComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,    
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
  providers: [AuthGuard, AuthService, DataService, UsersService, HttpClientModule, UserlistComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
