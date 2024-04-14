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
} else {
  // Erreur côté serveur
  console.error(
    `Erreur ${error.status} :
    ${error.error}`
  );
}
return throwError('coté serveur'); // Retourne une observable avec un message d'erreur
}








}