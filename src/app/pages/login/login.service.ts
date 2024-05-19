import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  access_token:any;
  userId:string='';
  decodedToken:any;
  constructor(private http : HttpClient, private router : Router) { 

}


  Authentification(email: string, password: string) {
    const auth = { email, password };
    
    return this.http.post<any>('http://localhost:3000/auth/login', auth, { headers: { 'Content-Type': 'application/json' } })
      .pipe(
        catchError(this.handleError) // Gestion des erreurs
      )
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
  
  // getTokenData() {
    
  //  return this.http.get<any>('http://localhost:3000/auth/tokenData');
   
  // }

  getTokenData(){
    const token = sessionStorage.getItem('access_token');
    
    if (token) {
      const decodedToken: any = jwtDecode(token);
    //  console.log(decodedToken); // Affiche le contenu du token décodé
    
    //  Exemple d'accès aux données de l'utilisateur
       this.userId = decodedToken.id;
     
    this.decodedToken=decodedToken
   
  
   
    }
//console.log(this.userId);
    return this.http.get<any>(`http://localhost:3000/auth/${this.userId}`);


  }
 async logout(){
     sessionStorage.removeItem('access_token');
   
       //  window.location.reload();
         await  this.router.navigate([ '/' ]);

  }
}

  


  

