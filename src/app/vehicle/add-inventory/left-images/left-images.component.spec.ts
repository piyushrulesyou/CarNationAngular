import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftImagesComponent } from './left-images.component';

describe('LeftImagesComponent', () => {
  let component: LeftImagesComponent;
  let fixture: ComponentFixture<LeftImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
