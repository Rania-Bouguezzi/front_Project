import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class BusesService {

  constructor(private http: HttpClient, private authService :LoginService ) {}

getAllBuses(): Observable<any[]>{
  return this.http.get<any[]>("http://localhost:3000/buses");
}

async addBus(busData: any): Promise<any> {
  try {
    const response = await this.authService.getTokenData().toPromise();
    const idAgency = response.agency.id;
    const idSpa = response.id;
    busData.agencyId = idAgency;
    busData.agencyId = idAgency;
    busData.spaId = idSpa;

    return this.http.post<any>('http://localhost:3000/buses/add', busData, { headers: { 'Content-Type': 'application/json' } }).toPromise();
  } catch (error) {
    console.error('Error adding transfer:', error);
    throw error;
  }
}

updateBus(id:string, bus:any):Observable<any>{

  return this.http.patch<any>(`http://localhost:3000/buses/${id}`, bus, { headers: {'Content-Type': 'application/json'} })
  }

  getById(id:string):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/buses/${id}`)
      }
      deleteBus(id:string):Observable<any>{
        return this.http.delete<any>(`http://localhost:3000/buses/${id}`)
    
      }
      getBusByAgency(idAgency:string){
        return this.http.get<any[]>(`http://localhost:3000/buses/agency/${idAgency}`)
      }
      



}
