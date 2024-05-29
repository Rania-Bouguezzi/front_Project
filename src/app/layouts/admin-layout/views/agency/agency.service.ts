import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http : HttpClient) {

   }

   getAgency(){
    return this.http.get<any>('http://localhost:3000/agencies');
  }
  

  getAgencyById(id:string){
    return this.http.get<any>(`http://localhost:3000/agencies/${id}`)
  }

}
