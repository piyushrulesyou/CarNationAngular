import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentFilterComponent } from './segment-filter.component';

describe('SegmentFilterComponent', () => {
  let component: SegmentFilterComponent;
  let fixture: ComponentFixture<SegmentFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
