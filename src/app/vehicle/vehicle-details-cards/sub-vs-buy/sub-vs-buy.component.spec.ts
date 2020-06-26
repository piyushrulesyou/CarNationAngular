import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubVsBuyComponent } from './sub-vs-buy.component';

describe('SubVsBuyComponent', () => {
  let component: SubVsBuyComponent;
  let fixture: ComponentFixture<SubVsBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubVsBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubVsBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
