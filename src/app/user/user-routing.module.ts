import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuardService } from '../core/auth-guard/auth-guard.service';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'login', component: SigninComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'details', component: UserDetailsComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule {
}