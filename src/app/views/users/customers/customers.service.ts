import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http : HttpClient) { }


  getAll(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/customers");
  }
  
  add(){
   // return this.http.post<any>('');
  }
  
  update(){}
  
  getById(id:string):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/customers/${id}`)
      }
deleteCustomer(id:string):Observable<any>{
  return this.http.delete<any>(`http://localhost:3000/customers/${id}`)

}

}
