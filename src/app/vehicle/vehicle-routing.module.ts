import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { AuthGuardService } from '../core/auth-guard/auth-guard.service';
import { VehicleListingComponent } from './vehicle-listing/vehicle-listing.component';
import { VehicleComponent } from './vehicle.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

const routes: Routes = [
    {
        path: '', component: VehicleComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: '', component: VehicleListingComponent },
            { path: 'vehicle-details/:vehicleId', component: VehicleDetailsComponent },
            { path: 'add-inventory', component: AddInventoryComponent }
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