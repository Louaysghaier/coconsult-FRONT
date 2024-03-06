import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySalesTeamComponent } from './activity-sales-team.component';

describe('ActivitySalesTeamComponent', () => {
  let component: ActivitySalesTeamComponent;
  let fixture: ComponentFixture<ActivitySalesTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySalesTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySalesTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
