import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);

  let isUserLoggedin = localStorage.getItem('loggedin');
  if (isUserLoggedin === 'true') {
    return true;
  } else {
    //alert("Not Authorised to this page , Login to access")
    _router.navigate(['login']);
    return false;
  }
};
