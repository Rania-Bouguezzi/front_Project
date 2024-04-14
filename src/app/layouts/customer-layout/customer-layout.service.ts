import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerLayoutService {

  constructor( private http : HttpClient) { }

  getTokenData() {
    
    return this.http.get<any>('http://localhost:3000/auth/tokenData');
  }
}
