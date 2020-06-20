import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './app-http-interceptor/app-http-interceptor.interceptor';
import { RefreshTokenInterceptor } from './refresh-token-interceptor/refresh-token-interceptor.interceptor';
import { SharedModule } from '../shared/shared-module';
@NgModule({
    declarations: [
    ],
    imports: [
        SharedModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
    ]
})
export class CoreModule {
}