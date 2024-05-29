import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../pages/login/login.service';
import { inject } from '@angular/core';

export const superAgentGuard: CanActivateFn = (): Observable<boolean> | Promise<boolean> | boolean => {
  const authService = inject(LoginService);

  return new Observable<boolean>((observer) => {
    authService.getTokenData().subscribe(
      (response) => {
        console.log(response);
     
     
        if (response.role === 'SuperAgent') {
          
          observer.next(true); 
        } else {
          observer.next(false); 
        }}   );
      })}