import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the token (adjust the storage mechanism as needed)
  const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoZWNuaWMiLCJpYXQiOjE3MzY5NDE5ODAsImV4cCI6MTczNjk3Nzk4MH0.SrUSMnJ_m1KSE_a7J10XffukzYoSkCawIDW3hwcecyKZfVOgLeLohiimAdHSbixVKY1xLhxbTzXTlnvbEOUfxw';

  // Clone the request and add the Authorization header
  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    : req;

  // Pass the request to the next handler
  return next(authReq);
};
