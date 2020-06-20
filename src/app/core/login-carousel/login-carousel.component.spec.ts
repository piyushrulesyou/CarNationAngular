import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCarouselComponent } from './login-carousel.component';

describe('LoginCarouselComponent', () => {
  let component: LoginCarouselComponent;
  let fixture: ComponentFixture<LoginCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
