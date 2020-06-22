import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { ErrorComponent } from './error/error.component';
import { VehicleListingComponent } from './vehicle-listing/vehicle-listing.component';
import { AuthGuardService } from './core/auth-guard/auth-guard.service';
import { SampleComponent } from './vehicle-listing/sample/sample.component';
import { VehicleDetailsComponent } from './vehicle-listing/vehicle-details/vehicle-details.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: SigninComponent, canActivate: [AuthGuardService] },
    { path: 'signup', component: SignupComponent, canActivate: [AuthGuardService] },
    { path: 'home', component: HomeComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuardService] },
    { path: 'vehicle', component: VehicleListingComponent, canActivate: [AuthGuardService] },
    { path: 'sample', component: SampleComponent },
    { path: 'vehicle-details/:vehicleId', component: VehicleDetailsComponent },
    { path: '**', component: ErrorComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouting {
}