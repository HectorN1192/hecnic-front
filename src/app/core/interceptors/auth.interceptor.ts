import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@core/services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  // Get the token (adjust the storage mechanism as needed)
  const token = tokenService.getToken();

  // Clone the request and add the Authorization header
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      })
    : req;

  // Pass the request to the next handler
  return next(authReq);
};
