import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigtaionBarComponent } from './navigtaion-bar.component';

describe('NavigtaionBarComponent', () => {
  let component: NavigtaionBarComponent;
  let fixture: ComponentFixture<NavigtaionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigtaionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigtaionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
