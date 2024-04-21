import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateRepertoireComponent } from './add-update-repertoire.component';

describe('AddUpdateRepertoireComponent', () => {
  let component: AddUpdateRepertoireComponent;
  let fixture: ComponentFixture<AddUpdateRepertoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateRepertoireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateRepertoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
