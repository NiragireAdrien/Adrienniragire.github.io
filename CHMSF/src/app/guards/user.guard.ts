import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('user') && !JSON.parse(localStorage.getItem('isAdmin'))) {
      return true;
    }

    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('isAdmin'))) {
      this.router.navigate(['/admin/appointments-list'], {queryParams: {returnUrl: state.url}}).then();
      return false;
    }


    this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}}).then();
    return false;
  }

}
