import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelFilterComponent } from './fuel-filter.component';

describe('FuelFilterComponent', () => {
  let component: FuelFilterComponent;
  let fixture: ComponentFixture<FuelFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
