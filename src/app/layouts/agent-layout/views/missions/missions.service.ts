import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  constructor(private http: HttpClient) { }


  getAllMissions(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/missions");
  }
  
  addMissions(name:string, from:string,to:string, date_time_start:string, date_time_end:string, nbrPassengers:string, totalPrice:string,status:string,dateMission:string){
    const mission = { name, from, to, date_time_start, date_time_end,nbrPassengers,totalPrice, status, dateMission };
    return this.http.post<any>('http://localhost:3000/missions/add', mission, { headers: {'Content-Type': 'application/json'} });

  }
  
  updateMissions(id:string, mission:any):Observable<any>{

    return this.http.patch<any>(`http://localhost:3000/missions/${id}`, mission, { headers: {'Content-Type': 'application/json'} })
    }
  
  

  deleteMissions(id:string):Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/missions/${id}`)

  }

  getVille(){
    return this.http.get<any[]>("http://localhost:3000/ville");
  }
  
  getById(id:string):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/missions/${id}`)
      }


}
