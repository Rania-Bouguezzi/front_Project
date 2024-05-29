import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencyDetailsService {

  constructor(private http : HttpClient) { }


  getAgentByAgency(idAgency:string){
    return this.http.get<any[]>(`http://localhost:3000/agent/agency/${idAgency}`)
  }
getSpaByAgency(idAgency: string){
  return this.http.get<any[]>(`http://localhost:3000/super-agent/agency/${idAgency}`)
}

getDriverByAgency(idAgency: string){
  return this.http.get<any[]>(`http://localhost:3000/drivers/agency/${idAgency}`)
}

getBusByAgency(idAgency: string){
  return this.http.get<any[]>(`http://localhost:3000/buses/agency/${idAgency}`)
}
getMissionrByAgency(idAgency: string){
  return this.http.get<any[]>(`http://localhost:3000/missions/agency/${idAgency}`)
}
getTransferByAgency(idAgency: string){
  return this.http.get<any[]>(`http://localhost:3000/transfers/agency/${idAgency}`)
}

getAgencyById(id:string){
  return this.http.get<any>(`http://localhost:3000/agencies/${id}`)
}



}
