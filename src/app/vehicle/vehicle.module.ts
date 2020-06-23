import { NgModule } from '@angular/core';
import { SampleComponent } from './sample/sample.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { SharedModule } from '../shared/shared-module';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleListingComponent } from './vehicle-listing/vehicle-listing.component';
import { VehicleComponent } from './vehicle.component';
import { CoreModule } from '../core/core.module';

@NgModule({
    declarations: [
        SampleComponent,
        VehicleListingComponent,
        VehicleDetailsComponent,
        VehicleComponent
    ],
    imports: [
        SharedModule,
        CoreModule,
        VehicleRoutingModule
    ]
})
export class VehicleModule {

}