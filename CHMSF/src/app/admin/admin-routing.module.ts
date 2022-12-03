import {RouterModule, Routes} from "@angular/router";
import {AdminWrapperComponent} from "./admin-wrapper/admin-wrapper.component";
import {AdminAppointmentsListComponent} from "./admin-appointments-list/admin-appointments-list.component";
import {UsersListComponent} from "./users-list/users-list.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
  {
    path: '',
    component: AdminWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'appointments-list'
      },
      {
        path: 'appointments-list',
        component: AdminAppointmentsListComponent
      },
      {
        path: 'users-list',
        component: UsersListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {

}
