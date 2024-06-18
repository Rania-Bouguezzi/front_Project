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

  async createAgency(data : any): Promise<any> {
    try {
   
  
      return this.http.post<any>('http://localhost:3000/agencies/createAgencyWithSuperAgent', data, { headers: { 'Content-Type': 'application/json' } }).toPromise();
   
    } catch (error) {
      console.error('Error adding Agent:', error);
      throw error;
    }
  }

}
