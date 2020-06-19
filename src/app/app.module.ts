import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NavigtaionBarComponent } from './navigtaion-bar/navigtaion-bar.component';
import { AppRouting } from './app-routing.module';
import { DialogModule } from 'primeng/dialog';
import { ErrorComponent } from './error/error.component';
import { CoreModule } from './core/core.module';
import { VehicleListingComponent } from './vehicle-listing/vehicle-listing.component';
import { LoadingSpinnerComponent } from './core/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    NavigtaionBarComponent,
    ErrorComponent,
    VehicleListingComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRouting,
    DialogModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
