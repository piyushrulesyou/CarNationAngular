import { TestBed } from '@angular/core/testing';

import { CognitoUserService } from './cognito-user.service';

describe('CognitoUserService', () => {
  let service: CognitoUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CognitoUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
