import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { Role } from '../model';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasRole(route);
  }

  canLoad(route: Route): Observable<boolean> {
    return this.hasRole(route);
  }

  private hasRole(route: Route | ActivatedRouteSnapshot) {
    const allowedRoles = route.data?.['allowedRoles'];

    return this.authService.user$.pipe(
      map((user) => Boolean(user && allowedRoles.includes(user.roles))),
      tap((hasRole) => hasRole === false && alert('Acceso Denegado'))
    );
  }
}

export function hasRole(allowedRoles: Role[]) {
  return () =>
    inject(AuthService).user$.pipe(
      map((user) => Boolean(user && (allowedRoles?.filter(item => user.roles.includes(item)))?.length )),
      tap((hasRole) => hasRole === false && alert('Acceso Denegado'))
    );
}
