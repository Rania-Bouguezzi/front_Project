import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {


  constructor(private http : HttpClient) { }


  getAll(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/agent");
  }
  
  add(){
   // return this.http.post<any>('');
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
