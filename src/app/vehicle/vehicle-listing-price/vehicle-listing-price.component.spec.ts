import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListingPriceComponent } from './vehicle-listing-price.component';

describe('VehicleListingPriceComponent', () => {
  let component: VehicleListingPriceComponent;
  let fixture: ComponentFixture<VehicleListingPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleListingPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleListingPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
