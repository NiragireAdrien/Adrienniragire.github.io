import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import {AppService} from "../../services/app.service";
import {ToastService} from "../../services/toast.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  showLoader = false;
  componentInView = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private appService: AppService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onLoginClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    this.showLoader = true;

    this.appService.login(this.form.value).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.showLoader = false;
      this.toastService.success(response.message);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isAdmin', JSON.stringify(response.isAdmin));

      if (response.isAdmin) {
        this.router.navigate(['/admin/appointments-list']).then();
      }

      if (!response.isAdmin) {
        this.router.navigate(['/user/appointments-list']).then();
      }
    }, error => {
      this.showLoader = false;
      this.toastService.error(error.error.message);
    });
  }
}
