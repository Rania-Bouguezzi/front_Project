import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

 

  constructor(private http: HttpClient, private authService :LoginService ) {  
}




async Register(agent : any ) : Promise <any>{
  
  try {
    const response = await this.authService.getTokenData().toPromise();
    const idAgency = response.agency.id;
    agent.agencyId = idAgency;

    return this.http.post<any>('http://localhost:3000/auth/agent/register', agent, { headers: { 'Content-Type': 'application/json' } }).toPromise();
  } catch (error) {
    console.error('Error adding transfer:', error);
    throw error;
  }
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