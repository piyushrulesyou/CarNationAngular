import { NgModule } from '@angular/core';
import { SampleComponent } from './sample/sample.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { SharedModule } from '../shared/shared-module';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleListingComponent } from './vehicle-listing/vehicle-listing.component';
import { VehicleComponent } from './vehicle.component';
import { CoreModule } from '../core/core.module';
import { VehicleListingPriceComponent } from './vehicle-listing-price/vehicle-listing-price.component';
import { VehicleCardsComponent } from './vehicle-details-cards/vehicle-cards.component';
import { SubVsBuyComponent } from './vehicle-details-cards/sub-vs-buy/sub-vs-buy.component';

@NgModule({
    declarations: [
        SampleComponent,
        VehicleListingComponent,
        VehicleDetailsComponent,
        VehicleComponent,
        VehicleListingPriceComponent,
        VehicleCardsComponent,
        SubVsBuyComponent
    ],
    imports: [
        SharedModule,
        CoreModule,
        VehicleRoutingModule
    ]
})
export class VehicleModule {

}