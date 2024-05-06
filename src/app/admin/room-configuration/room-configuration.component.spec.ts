import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomConfigurationComponent } from './room-configuration.component';

describe('RoomConfigurationComponent', () => {
  let component: RoomConfigurationComponent;
  let fixture: ComponentFixture<RoomConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
