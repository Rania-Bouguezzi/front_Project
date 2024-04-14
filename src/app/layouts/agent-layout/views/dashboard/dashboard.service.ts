import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }


  getAllUsers(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/auth/allUsers");
  }

  getAgent(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/agent');
  }


  getNumberBusByAgency(idAgency:string){
    return this.http.get<any[]>(`http://localhost:3000/buses/busNumber/agency/${idAgency}`)
  }
  getNumberTransfersByAgency(idAgency:string){
    return this.http.get<any[]>(`http://localhost:3000/transfers/TransferNumber/agency/${idAgency}`)
  }

  getNumberAgentsByAgency(idAgency:string){
    return this.http.get<any[]>(`http://localhost:3000/agent/agentsNumber/agency/${idAgency}`)
  }
  getNumberDriversByAgency(idAgency:string){
    return this.http.get<any[]>(`http://localhost:3000/drivers/driversNumber/agency/${idAgency}`)
  }
}
