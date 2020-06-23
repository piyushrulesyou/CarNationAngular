import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { AuthGuardService } from '../core/auth-guard/auth-guard.service';
import { SampleComponent } from './sample/sample.component';
import { VehicleListingComponent } from './vehicle-listing/vehicle-listing.component';
import { VehicleComponent } from './vehicle.component';

const routes: Routes = [
    {
        path: '', component: VehicleComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: '', component: VehicleListingComponent },
            { path: 'vehicle-details/:id', component: VehicleDetailsComponent },
            { path: 'sample', component: SampleComponent }
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

export class VehicleRoutingModule {
}