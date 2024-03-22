import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransfersService {

  constructor(private http : HttpClient) { }


  getAll(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/transfers");
  }
  
  addTransfer(from:string, to:string,date_time_Depart:string,date_time_Arrive:string,nbrePlacesDisponibles:string,priceTransferForPerson:string,etatTransfer:string,note:string,extra:string,status:string){
    const transfer = { from, to, date_time_Depart, date_time_Arrive,nbrePlacesDisponibles,priceTransferForPerson, etatTransfer, note, extra, status };
    return this.http.post<any>('http://localhost:3000/transfers/add', transfer, { headers: {'Content-Type': 'application/json'} });
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










}
