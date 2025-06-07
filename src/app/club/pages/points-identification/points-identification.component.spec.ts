import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsIdentificationComponent } from './points-identification.component';

describe('PointsIdentificationComponent', () => {
  let component: PointsIdentificationComponent;
  let fixture: ComponentFixture<PointsIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointsIdentificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
