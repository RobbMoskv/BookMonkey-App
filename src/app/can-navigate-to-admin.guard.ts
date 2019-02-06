import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {

  accessGranted = false;

  canActivate(): boolean {
    // Make sure window gets triggered the first time
    if (!this.accessGranted) {
      this.accessGranted = window.confirm('Möchten Sie den Admin-Bereich wirklich betreten?');
    }
    return this.accessGranted;
  }
}
