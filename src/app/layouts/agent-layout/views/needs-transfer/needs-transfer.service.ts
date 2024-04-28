import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class NeedsTransferService {

  constructor(private http : HttpClient, private readonly authService : LoginService) { }

getTransfer(){

}


async addTransfer(transferData: any): Promise<any> {
  try {
    const response = await this.authService.getTokenData().toPromise();
    const idAgency = response.agency.id;
    const idagent = response.id;
    transferData.agencyId = idAgency;
    transferData.agentId= idagent;


    return this.http.post<any>('http://localhost:3000/need-transfer/add', transferData, { headers: { 'Content-Type': 'application/json' } }).toPromise();
  } catch (error) {
    console.error('Error adding transfer:', error);
    throw error;
  }
}


getAll(){
  return this.http.get<any[]>('http://localhost:3000/need-transfer')
}
delete(id:string):Observable<any>{
  return this.http.delete<any>(`http://localhost:3000/need-transfer/${id}`)

}
updateTransfer(id:string, transfer:any):Observable<any>{

  return this.http.patch<any>(`http://localhost:3000/need-transfer/${id}`, transfer, { headers: {'Content-Type': 'application/json'} })
  }
  getById(id:string):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/need-transfer/${id}`)
      }

}
