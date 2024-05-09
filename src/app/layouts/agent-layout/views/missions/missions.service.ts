import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  constructor(private http: HttpClient, private authService : LoginService) { }


  getAllMissions(idAgency:string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/missions/agency/${idAgency}`);
  }
  

async addMissions(missionData: any): Promise<any> {
  try {
    const response = await this.authService.getTokenData().toPromise();
    const idAgent = response.id;
    missionData.agentId = idAgent;


    return this.http.post<any>('http://localhost:3000/missions/add', missionData, { headers: { 'Content-Type': 'application/json' } }).toPromise();
  } catch (error) {
    console.error('Error adding transfer:', error);
    throw error;
  }
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
