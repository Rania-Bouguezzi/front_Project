import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private http : HttpClient) { }

 
  getBooking(id:string):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/notifications/booking/${id}`)
      }

      getAgencyById(id:string):Observable<any>{
        return this.http.get<any>(`http://localhost:3000/agencies/${id}`)
          }
      
          getTransferById(id:string):Observable<any>{
            return this.http.get<any>(`http://localhost:3000/transfers/${id}`);
              }
}

