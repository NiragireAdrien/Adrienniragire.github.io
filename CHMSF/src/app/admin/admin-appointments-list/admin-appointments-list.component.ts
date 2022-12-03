import { Component, OnInit } from '@angular/core';
import {ToastService} from "../../services/toast.service";
import {AppService} from "../../services/app.service";
import {Subject, takeUntil} from "rxjs";
import {APPOINTMENT_STATUS} from "../../config/constant";

@Component({
  selector: 'app-admin-appointments-list',
  templateUrl: './admin-appointments-list.component.html',
  styleUrls: ['./admin-appointments-list.component.scss']
})
export class AdminAppointmentsListComponent implements OnInit {

  selectedAppointment;
  showLoader = false;
  appointments = [];
  appointmentStatus = APPOINTMENT_STATUS;
  showAppointmentDialog = false;
  componentInView = new Subject()

  constructor(
    private toastService: ToastService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.showLoader = true;
    this.appService.getAppointments().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.appointments = response.appointments;
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  updateAppointmentStatus(status, appointmentId): void {
    const params = {
      status: status
    };

    this.showLoader = true;

    this.appService.updateAppointmentStatus(params, appointmentId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.getAppointments();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }
}
