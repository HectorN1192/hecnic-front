// import { Injectable } from '@angular/core';
// import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { TokenService } from './token.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate, CanActivateChild {
//   realRol: string;

//   constructor(
//     private tokenService: TokenService, private router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     // const expectedRol = route.data.expectedRol;
//     // const roles = this.tokenService.getAuthorities();
//     // this.realRol = 'user';
//     // roles.forEach(rol => {
//     //   if (rol === 'ROLE_ADMIN') {
//     //     this.realRol = 'admin';
//     //   }
//     // });

//     // if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1) {
//     //   this.router.navigate(['login']);
//     //   return false;
//     // }

//     if (this.tokenService.getToken()) {
//       return true;
//     }

//     this.router.navigate(['login']);
//     return false;
//   }

//   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     return this.canActivate(route, state);
//   }
// }

import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from './token.service';

export const authGuardFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  // Comprobar si el usuario tiene un token válido
  if (tokenService.getToken()) {
    return true;
  }

  // Redirigir al login si no está autenticado
  router.navigate(['']);
  return false;
};
