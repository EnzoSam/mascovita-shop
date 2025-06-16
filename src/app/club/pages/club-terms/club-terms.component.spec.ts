import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubTermsComponent } from './club-terms.component';

describe('ClubTermsComponent', () => {
  let component: ClubTermsComponent;
  let fixture: ComponentFixture<ClubTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubTermsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
