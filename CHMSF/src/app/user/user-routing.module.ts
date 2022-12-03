import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppointmentsListComponent} from "./appointments-list/appointments-list.component";
import {UserWrapperComponent} from "./user-wrapper/user-wrapper.component";
import {ScheduleAppointmentComponent} from "./schedule-appointment/schedule-appointment.component";

const routes: Routes = [
  {
    path: '',
    component: UserWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'appointments-list',
        pathMatch: 'full'
      },
      {
        path: 'appointments-list',
        component: AppointmentsListComponent
      },
      {
        path: 'schedule-appointment',
        component: ScheduleAppointmentComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {}
