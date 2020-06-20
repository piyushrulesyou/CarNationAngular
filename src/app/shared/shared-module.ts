import { NgModule } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { LoadingSpinnerComponent } from '../core/loading-spinner/loading-spinner.component';
import { LoginCarouselComponent } from '../core/login-carousel/login-carousel.component';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        LoginCarouselComponent
    ],
    imports: [
        CarouselModule
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