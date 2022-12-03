import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminAppointmentsListComponent} from './admin-appointments-list/admin-appointments-list.component';
import {UsersListComponent} from './users-list/users-list.component';
import {ViewAppointmentComponent} from './view-appointment/view-appointment.component';
import {AdminWrapperComponent} from './admin-wrapper/admin-wrapper.component';
import {SharedModule} from "../shared/shared.module";
import {AdminRoutingModule} from "./admin-routing.module";
import {ConfirmationService} from "primeng/api";

@NgModule({
  declarations: [
    AdminAppointmentsListComponent,
    UsersListComponent,
    ViewAppointmentComponent,
    AdminWrapperComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class AdminModule {
}
