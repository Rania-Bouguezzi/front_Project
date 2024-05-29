import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../pages/login/login.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (): Observable<boolean> | Promise<boolean> | boolean => {
  const authService = inject(LoginService);

  return new Observable<boolean>((observer) => {
    authService.getTokenData().subscribe(
      (response) => {
        console.log(response);
     
     
        if (response.role === "SuperAdmin") {
          console.log('oui', response.role)
          observer.next(true); 
        } else {
          console.log('non', response.role)
          observer.next(false); 
        }}   );
      })}