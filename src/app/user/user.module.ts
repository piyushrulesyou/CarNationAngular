import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared-module';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { DialogModule } from 'primeng/dialog';
import { UserComponent } from './user.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
    declarations: [
        UserComponent,
        SigninComponent,
        SignupComponent,
        UserDetailsComponent
    ],
    imports: [
        SharedModule,
        CoreModule,
        FormsModule,
        UserRoutingModule,
        DialogModule
    ]
})
export class UserModule {

}