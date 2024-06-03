import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPlayComponent } from './group-play.component';

describe('GroupPlayComponent', () => {
  let component: GroupPlayComponent;
  let fixture: ComponentFixture<GroupPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupPlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
