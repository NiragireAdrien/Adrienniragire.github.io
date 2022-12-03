import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {UtilService} from "../../services/util.service";
import {AppService} from "../../services/app.service";
import {ToastService} from "../../services/toast.service";
import {APPOINTMENT_STATUS, HOSPITAL_SERVICES} from "../../config/constant";
import * as moment from "moment";

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit {

  user;
  form: FormGroup;
  showLoader = false;
  appointmentMinDate = new Date();
  componentInView = new Subject();
  serviceOptions = HOSPITAL_SERVICES;
  @Output() hideScheduleAppointmentDialog = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private toastService: ToastService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.form.patchValue(this.user);
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      service: new FormControl(null, [Validators.required]),
      appointmentDate: new FormControl(null, [Validators.required]),
    });
  }

  onScheduleAppointmentClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    console.log(this.form.get('appointmentDate').value)

    const params = {
      ...this.form.value,
      user: this.user.id,
      appointmentDate: moment(this.form.get('appointmentDate').value).format("DD MMM YYYY hh:mm A"),
      status: APPOINTMENT_STATUS.pending
    };

    this.showLoader = true;
    this.appService.scheduleAppointment(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.hideScheduleAppointmentDialog.emit();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }
}
