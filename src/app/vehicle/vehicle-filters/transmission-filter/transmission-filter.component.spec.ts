import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionFilterComponent } from './transmission-filter.component';

describe('TransmissionFilterComponent', () => {
  let component: TransmissionFilterComponent;
  let fixture: ComponentFixture<TransmissionFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmissionFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
