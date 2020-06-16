import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptorService } from './app-http-interceptor/app-http-interceptor.service';
@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptorService, multi: true }
    ]
})
export class CoreModule {
}