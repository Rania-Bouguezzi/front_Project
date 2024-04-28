import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {


  constructor(private http : HttpClient, private authService: LoginService) { }


  getAll(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/agent");
  }
  
  
  async addAgent(agentData: any): Promise<any> {
    try {
      const response = await this.authService.getTokenData().toPromise();
      const idAgency = response.agency.id;
      const idSpa = response.id;
      agentData.agencyId = idAgency;
      agentData.spaId = idSpa;

      return this.http.post<any>('http://localhost:3000/auth/agent/register', agentData, { headers: { 'Content-Type': 'application/json' } }).toPromise();
    } catch (error) {
      console.error('Error adding Agent:', error);
      throw error;
    }
  }

  
  update(){}
  
  getById(id:string):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/agent/${id}`)
      }
deleteAgent(id:string):Observable<any>{
  return this.http.delete<any>(`http://localhost:3000/agent/${id}`)

}

getAgentByAgency(idAgency:string){
  return this.http.get<any[]>(`http://localhost:3000/agent/agency/${idAgency}`)
}

}
