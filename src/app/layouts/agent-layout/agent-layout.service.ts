import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentLayoutService {
  private sharedTransfers: any[] = [];

  constructor( private http : HttpClient) { }

  getTokenData() {
    
    return this.http.get<any>('http://localhost:3000/auth/tokenData');
  }

 



  addTransfer(transfer: any): void {
    this.sharedTransfers.push(transfer);
  }

  getSharedTransfers(): Observable<any[]> {
    return of(this.sharedTransfers);
  }

}
