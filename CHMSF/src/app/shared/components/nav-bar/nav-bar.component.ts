import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() options: { label: string, route: string }[] = [];

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onLogOutOptionClicked(option): void {
    localStorage.clear();

    this.router.navigate([option.route]).then();
  }
}
