import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import {ToastService} from "../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users = [];
  showLoader = false;
  componentInView = new Subject();

  constructor(
    private appService: AppService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.showLoader = true;
    this.appService.getUsers().pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.users = response.users;
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }

  onDeleteUserClicked(user): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.deleteUser(user.id);
      }
    });
  }

  deleteUser(id): void {
    this.showLoader = true;
    this.appService.deleteUser(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      this.getUsers();
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }
}
