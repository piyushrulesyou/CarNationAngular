import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleLoginComponent } from './sample-login.component';

describe('SampleLoginComponent', () => {
  let component: SampleLoginComponent;
  let fixture: ComponentFixture<SampleLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
