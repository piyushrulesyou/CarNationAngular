import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuardService } from './core/auth-guard/auth-guard.service';
import { SampleComponent } from './vehicle/sample/sample.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: SigninComponent, canActivate: [AuthGuardService] },
    { path: 'signup', component: SignupComponent, canActivate: [AuthGuardService] },
    { path: 'home', component: HomeComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuardService] },
    {
        path: 'vehicle', loadChildren:
            () => import('./vehicle/vehicle.module').
                then(m => m.VehicleModule)
    },
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