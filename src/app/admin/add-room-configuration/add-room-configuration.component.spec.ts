import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomConfigurationComponent } from './add-room-configuration.component';

describe('AddRoomConfigurationComponent', () => {
  let component: AddRoomConfigurationComponent;
  let fixture: ComponentFixture<AddRoomConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoomConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoomConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
