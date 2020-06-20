import { TestBed } from '@angular/core/testing';

import { AppHttpInterceptor } from './app-http-interceptor.interceptor';

describe('AppHttpInterceptor', () => {
  let service: AppHttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppHttpInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
