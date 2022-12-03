import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppointmentsListComponent} from './appointments-list/appointments-list.component';
import {UserWrapperComponent} from './user-wrapper/user-wrapper.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {UserRoutingModule} from "./user-routing.module";
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';


@NgModule({
  declarations: [
    AppointmentsListComponent,
    UserWrapperComponent,
    ScheduleAppointmentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule {
}
