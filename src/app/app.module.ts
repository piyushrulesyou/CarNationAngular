import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigtaionBarComponent } from './navigtaion-bar/navigtaion-bar.component';
import { AppRouting } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { CoreModule } from './core/core.module';
import { FaqVehiclesComponent } from './home/faq-vehicles/faq-vehicles.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { DisclaimerComponent } from './home/disclaimer/disclaimer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigtaionBarComponent,
    ErrorComponent,
    FaqVehiclesComponent,
    BottomBarComponent,
    DisclaimerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
