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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactComponent,
    RegisterComponent,
    PageNotFoundComponent,
    UserlistComponent,
    UserComponent,
    FilterBabies
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
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
  providers: [AuthGuard, AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
