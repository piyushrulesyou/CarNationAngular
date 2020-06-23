import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'user', loadChildren:
            () => import('./user/user.module').
                then(m => m.UserModule)
    },
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