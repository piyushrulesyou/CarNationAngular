import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './app-http-interceptor/app-http-interceptor.interceptor';
import { RefreshTokenInterceptor } from './refresh-token-interceptor/refresh-token-interceptor.interceptor';
@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
    ]
})
export class CoreModule {
}