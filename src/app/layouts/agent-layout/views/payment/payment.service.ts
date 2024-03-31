import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http : HttpClient) { }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/payment");
  }
  
  add(){
   // return this.http.post<any>('');
  }
  
  update(){}
  
  getById(){}
  delet(){}
}
