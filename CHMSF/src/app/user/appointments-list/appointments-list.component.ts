import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AppService} from "../../services/app.service";
import {Subject, takeUntil} from "rxjs";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})
export class AppointmentsListComponent implements OnInit {

  appointments = [];
  showScheduleAppointmentDialog = false;
  showLoader = false;
  componentInView = new Subject();

  constructor(
    private router: Router,
    private appService: AppService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getAppointmentsByUserId();
  }

  getAppointmentsByUserId(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    this.showLoader = true;
    this.appService.getAppointmentsByUserId(user.id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.appointments = response.appointments;
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  onLogoutClick(): void {
    localStorage.clear();

    this.router.navigate(['/auth/login']).then();
  }
}
