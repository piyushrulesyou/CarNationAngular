import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoVehicleResetFilterComponent } from './no-vehicle-reset-filter.component';

describe('NoVehicleResetFilterComponent', () => {
  let component: NoVehicleResetFilterComponent;
  let fixture: ComponentFixture<NoVehicleResetFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoVehicleResetFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoVehicleResetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
