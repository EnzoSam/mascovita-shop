import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsResultsComponent } from './points-results.component';

describe('PointsResultsComponent', () => {
  let component: PointsResultsComponent;
  let fixture: ComponentFixture<PointsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointsResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
