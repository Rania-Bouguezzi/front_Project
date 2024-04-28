import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../pages/login/login.service';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state): Observable<boolean> | Promise<boolean> | boolean => {
  const authService = inject(LoginService);

  return new Observable<boolean>((observer) => {
    authService.getTokenData().subscribe(
      (response) => {
        console.log(response);
     
     
        if (response.role === 'Agent') {
          
          observer.next(true); 
        } else {
          observer.next(false); 
        }}   );
})}
