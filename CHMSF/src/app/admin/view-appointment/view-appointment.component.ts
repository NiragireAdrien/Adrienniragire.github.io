import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {APPOINTMENT_STATUS, HOSPITAL_SERVICES} from "../../config/constant";
import * as moment from "moment";
import {ConfirmationService} from "primeng/api";
import {AppService} from "../../services/app.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss']
})
export class ViewAppointmentComponent implements OnInit {

  form: FormGroup;
  showLoader = false;
  appointmentMinDate = new Date();
  componentInView = new Subject();
  serviceOptions = HOSPITAL_SERVICES;
  @Input() appointmentToView;
  @Output() hideViewAppointmentDialog = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private appService: AppService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.form.patchValue(this.appointmentToView);
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: new FormControl({value: '', disabled: true}, [Validators.required]),
      firstName: new FormControl({value: '', disabled: true}, [Validators.required]),
      lastName: new FormControl({value: '', disabled: true}, [Validators.required]),
      phoneNumber: new FormControl({value: '', disabled: true}, [Validators.required]),
      email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
      service: new FormControl({value: '', disabled: true}, [Validators.required]),
      appointmentDate: new FormControl({value: '', disabled: true}, [Validators.required]),
    });
  }

  onAcceptAppointmentClicked(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.updateAppointmentStatus(APPOINTMENT_STATUS.accepted);
      }
    });
  }

  onRejectAppointmentClicked(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.updateAppointmentStatus(APPOINTMENT_STATUS.rejected);
      }
    });
  }

  updateAppointmentStatus(status): void {
    const params = {
      status: status
    };

    this.showLoader = true;

    this.appService.updateAppointmentStatus(params, this.appointmentToView.id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.hideViewAppointmentDialog.emit();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }
}
