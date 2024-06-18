import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }



  getAllUsers(){
    return this.http.get<any[]>('http://localhost:3000/auth/findUsers');
  }
  getById(id:string):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/auth/${id}`)
      }
}
