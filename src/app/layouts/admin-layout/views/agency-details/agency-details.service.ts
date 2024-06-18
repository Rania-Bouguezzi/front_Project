import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyDetailsService {

  constructor(private http : HttpClient) { }


  getAgentByAgency(idAgency:string){
    return this.http.get<any[]>(`http://localhost:3000/agent/agency/${idAgency}`);
  }
getSpaByAgency(idAgency: string){
  return this.http.get<any[]>(`http://localhost:3000/super-agent/agency/${idAgency}`);
}

getDriverByAgency(idAgency: string){
  return this.http.get<any[]>(`http://localhost:3000/drivers/agency/${idAgency}`);
}

getBusByAgency(idAgency: string){
  return this.http.get<any[]>(`http://localhost:3000/buses/agency/${idAgency}`);
}
getMissionrByAgency(idAgency: string){
  return this.http.get<any[]>(`http://localhost:3000/missions/agency/${idAgency}`);
}
getTransferByAgency(idAgency: string){
  return this.http.get<any[]>(`http://localhost:3000/transfers/agency/${idAgency}`);
}

getAgencyById(id:string){
  return this.http.get<any>(`http://localhost:3000/agencies/${id}`);
}

getNotifTransfert(idAgency:string, idTransfer:string){
  return this.http.get<any[]>(`http://localhost:3000/notifications/${idAgency}/transfer/${idTransfer}`);
}

getMissionById(idMission:string){
  return this.http.get<any[]>(`http://localhost:3000/missions/${idMission}`);
}


deleteAgency(id:string, agency:any):Observable<any>{

  return this.http.patch<any>(`http://localhost:3000/agencies/${id}`, agency, { headers: {'Content-Type': 'application/json'} })
  }

  updateAgency(id:string, agency:any):Observable<any>{

    return this.http.patch<any>(`http://localhost:3000/agencies/${id}`, agency, { headers: {'Content-Type': 'application/json'} })
    }
    getById(id:string):Observable<any>{
      return this.http.get<any>(`http://localhost:3000/agencies/${id}`)
        }

}

