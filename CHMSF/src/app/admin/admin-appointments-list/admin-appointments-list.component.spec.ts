import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppointmentsListComponent } from './admin-appointments-list.component';

describe('AdminAppointmentsListComponent', () => {
  let component: AdminAppointmentsListComponent;
  let fixture: ComponentFixture<AdminAppointmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAppointmentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAppointmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
