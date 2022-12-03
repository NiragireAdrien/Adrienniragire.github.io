import { Component } from '@angular/core';
import { ANIMATIONS } from './config/animations';
import {AppService} from "./services/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: ANIMATIONS.routesAnimation
})
export class AppComponent {
  title = 'Hospital-Management-System';

  constructor(public appService: AppService) {
  }
}
