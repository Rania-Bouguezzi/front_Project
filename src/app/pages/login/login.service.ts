import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }


  Authentification(email: string, password: string) {
    const auth = { email, password };
    
    return this.http.post<any>('http://localhost:3000/auth/login', auth, { headers: { 'Content-Type': 'application/json' } })
      .pipe(
        catchError(this.handleError) // Gestion des erreurs
      );
  }

  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Une erreur s\'est produite :', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Erreur ${error.status} :
        ${error.error}`
      );
    }
    return throwError('invalid email or password'); // Retourne une observable avec un message d'erreur
  }
  


  
}
