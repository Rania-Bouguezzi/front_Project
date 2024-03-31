import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

 

  constructor(private http: HttpClient ) {  
}




Register(username:string, email: string, firstname:string, lastname:string, password:string,birthDate:string,address:string,picture:string,phone:string, genre:string  ){
  
  const user = { username, email, firstname, lastname, password, birthDate, address, picture, phone, genre };
  return this.http.post<any>('localhost:3000/auth/customer/register', user, { headers: {'Content-Type': 'application/json'} })
  .pipe(
    catchError(this.handleError) // Gestion des erreurs
  );
}
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // Erreur côté client
    console.error('Une erreur s\'est produite :', error.error.message);
    return throwError('Une erreur s\'est produite côté client.');
  } else if (error.status === 0) {
    // Erreur de communication ou API inaccessible
    console.error('Erreur de communication :', error.message);
    return throwError('Erreur de communication avec le serveur.');
  } else {
    // Erreur côté serveur avec code de statut HTTP
    console.error(
      `Erreur ${error.status} :
      ${error.error}`
    );

    let errorMessage = 'Erreur serveur';
    // Ajoutez ici d'autres cas de gestion d'erreurs si nécessaire

    return throwError(errorMessage); // Retourne une observable avec un message d'erreur approprié
  }
}






}