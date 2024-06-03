import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySinglesComponent } from './play-singles.component';

describe('PlaySinglesComponent', () => {
  let component: PlaySinglesComponent;
  let fixture: ComponentFixture<PlaySinglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaySinglesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaySinglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
