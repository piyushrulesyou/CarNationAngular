import { NgModule } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { LoadingSpinnerComponent } from '../core/loading-spinner/loading-spinner.component';
import { LoginCarouselComponent } from '../core/login-carousel/login-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button'

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        LoginCarouselComponent
    ],
    imports: [
        CarouselModule,
        HttpClientModule,
        FormsModule,
        CheckboxModule,
        DropdownModule,
        ButtonModule
    ],
    providers: [],
    exports: [
        CarouselModule,
        LoadingSpinnerComponent,
        LoginCarouselComponent,
        FormsModule,
        CheckboxModule,
        DropdownModule,
        ButtonModule
    ]
})

export class SharedModule {

}