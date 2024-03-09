import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapatchaComponent } from './capatcha.component';

describe('CapatchaComponent', () => {
  let component: CapatchaComponent;
  let fixture: ComponentFixture<CapatchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapatchaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapatchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
