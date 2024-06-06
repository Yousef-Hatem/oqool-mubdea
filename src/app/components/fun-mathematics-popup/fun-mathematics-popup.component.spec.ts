import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunMathematicsPopupComponent } from './fun-mathematics-popup.component';

describe('FunMathematicsPopupComponent', () => {
  let component: FunMathematicsPopupComponent;
  let fixture: ComponentFixture<FunMathematicsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunMathematicsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunMathematicsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
