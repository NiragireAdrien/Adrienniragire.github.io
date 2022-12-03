import { Component, OnInit } from '@angular/core';
import {ANIMATIONS} from "../../config/animations";

@Component({
  selector: 'app-admin-wrapper',
  templateUrl: './admin-wrapper.component.html',
  styleUrls: ['./admin-wrapper.component.scss'],
  animations: ANIMATIONS.routesAnimation
})
export class AdminWrapperComponent implements OnInit {

  navbarOptions = [
    {label: 'Appointments', route: 'appointments-list'},
    {label: 'Users', route: 'users-list'},
    {label: 'Logout', route: '/auth/login'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
