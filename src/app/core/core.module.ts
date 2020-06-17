import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptorService } from './app-http-interceptor/app-http-interceptor.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptorService, multi: true }
    ],
    declarations: [
        LoadingSpinnerComponent
    ]
})
export class CoreModule {
}