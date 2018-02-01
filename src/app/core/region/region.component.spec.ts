import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionComponent } from './region.component';
import { RegionService } from '../region.service';

describe('RegionComponent', () => {
  let component: RegionComponent;
  let fixture: ComponentFixture<RegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionComponent ],
      providers: [
        RegionService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
