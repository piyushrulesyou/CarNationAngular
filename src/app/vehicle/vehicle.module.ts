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
import { VehicleFiltersComponent } from './vehicle-filters/vehicle-filters.component';
import { BrandFilterComponent } from './vehicle-filters/brand-filter/brand-filter.component';
import { CityFilterComponent } from './vehicle-filters/city-filter/city-filter.component';
import { FuelFilterComponent } from './vehicle-filters/fuel-filter/fuel-filter.component';
import { PriceFilterComponent } from './vehicle-filters/price-filter/price-filter.component';
import { SegmentFilterComponent } from './vehicle-filters/segment-filter/segment-filter.component';
import { TransmissionFilterComponent } from './vehicle-filters/transmission-filter/transmission-filter.component';

@NgModule({
    declarations: [
        SampleComponent,
        VehicleListingComponent,
        VehicleDetailsComponent,
        VehicleComponent,
        VehicleListingPriceComponent,
        VehicleCardsComponent,
        SubVsBuyComponent,
        VehicleFiltersComponent,
        BrandFilterComponent,
        CityFilterComponent,
        FuelFilterComponent,
        PriceFilterComponent,
        SegmentFilterComponent,
        TransmissionFilterComponent
    ],
    imports: [
        SharedModule,
        CoreModule,
        VehicleRoutingModule
    ]
})
export class VehicleModule {

}