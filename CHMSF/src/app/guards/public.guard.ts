import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!localStorage.getItem('user')) {
      return true;
    }

    if(JSON.parse(localStorage.getItem('isAdmin'))) {
      this.router.navigate(['/admin/appointments-list'], {queryParams: {returnUrl: state.url}}).then();
      return false;
    }

    if(!JSON.parse(localStorage.getItem('isAdmin'))) {
      this.router.navigate(['/user/appointments-list'], {queryParams: {returnUrl: state.url}}).then();
      return false;
    }

  }

}
