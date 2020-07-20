import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqVehiclesComponent } from './faq-vehicles.component';

describe('FaqVehiclesComponent', () => {
  let component: FaqVehiclesComponent;
  let fixture: ComponentFixture<FaqVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
