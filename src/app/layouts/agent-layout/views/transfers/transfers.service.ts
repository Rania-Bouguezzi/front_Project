import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from 'src/app/pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class TransfersService {
  private transferData = new BehaviorSubject<any>(null);
  transferData$ = this.transferData.asObservable();
  idAgency:string="";
  logo: string = '';
  agencyName: string = '';
  time:string='';
  constructor(private http : HttpClient, private authService : LoginService) { }


  getAll(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/transfers");
  }
  
  
  async addTransfer(transferData: any): Promise<any> {
    try {
      const response = await this.authService.getTokenData().toPromise();
      const idAgency = response.agency.id;
      const idSpa = response.id;
      transferData.agencyId = idAgency;
      transferData.agentId = idSpa;
  

      return this.http.post<any>('http://localhost:3000/transfers/add', transferData, { headers: { 'Content-Type': 'application/json' } }).toPromise();
    } catch (error) {
      console.error('Error adding transfer:', error);
      throw error;
    }
  }


  
  updateTransfer(id:string, transfer:any):Observable<any>{

    return this.http.patch<any>(`http://localhost:3000/transfers/${id}`, transfer, { headers: {'Content-Type': 'application/json'} })
    }
  
  
    getById(id:string):Observable<any>{
      return this.http.get<any>(`http://localhost:3000/transfers/${id}`)
        }
  deleteTransfer(id:string):Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/transfers/${id}`)

  }
getVille(){
  return this.http.get<any[]>("http://localhost:3000/ville")
}

getTransferByAgency(idAgency:string){
  return this.http.get<any[]>(`http://localhost:3000/transfers/agency/${idAgency}`)
}







getToken(){
  return this.authService.getTokenData();
}







setTransferData(data: any) {
  // Stocker les données dans le BehaviorSubject
  this.transferData.next(data);

  // Stocker les données dans le localStorage
  localStorage.setItem('transferData', JSON.stringify(data));
}

getTransferDataFromStorage(): any {
  const data = localStorage.getItem('transferData');
  return data ? JSON.parse(data) : null;
}



}
