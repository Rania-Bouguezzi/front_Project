import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriverLayoutService {

  constructor(private http : HttpClient) { }


  getMissionByDriver(idAgency:string, idDriver: string){
    return this.http.get<any>(`http://localhost:3000/missions/${idAgency}/driver/${idDriver}`);
  }
  getFeedbackByMission(idMission:string){
    return this.http.get<any[]>(`http://localhost:3000/feedbacks/mission/${idMission}`)
  }
  
}
