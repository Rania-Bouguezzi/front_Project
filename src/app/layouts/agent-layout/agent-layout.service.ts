import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgentLayoutService {
  private sharedTransfers: any[] = [];

  constructor( private http : HttpClient) { }


 



  addTransfer(transfer: any): void {
    this.sharedTransfers.push(transfer);
  }

  // getSharedTransfers(): Observable<any[]> {
  //   return of(this.sharedTransfers);
  // }

getVille(){
  return this.http.get<any>('http://localhost:3000/ville');
}

 getSharedTransfers(): Observable<any[]> {
    return of(this.sharedTransfers);
  }
  getSharedTransfer(){
    return this.http.get<any[]>('http://localhost:3000/transfers/shared/Transfer');
  }
  
}
