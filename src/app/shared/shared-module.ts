import { NgModule } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { LoadingSpinnerComponent } from '../core/loading-spinner/loading-spinner.component';
import { LoginCarouselComponent } from '../core/login-carousel/login-carousel.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        LoginCarouselComponent
    ],
    imports: [
        CarouselModule,
        HttpClientModule
    ],
    providers: [],
    exports: [
        CarouselModule,
        LoadingSpinnerComponent,
        LoginCarouselComponent
    ]
})

export class SharedModule {

}