import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepertoireListComponent } from './repertoire-list.component';

describe('RepertoireListComponent', () => {
  let component: RepertoireListComponent;
  let fixture: ComponentFixture<RepertoireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepertoireListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepertoireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
