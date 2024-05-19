import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyProfileService {

  constructor(private http : HttpClient) { }


  getAgencyById(id:string):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/agencies/${id}`)
      }

getMissionByAgency(id:string):Observable<any>{
  return this.http.get<any>(`http://localhost:3000/missions/agency/${id}`)
    }

    countFeedbacks(idAgency:string):Observable<any>{
      return this.http.get<any>(`http://localhost:3000/feedbacks/count/agency/${idAgency}`)
        }

getNeedTransferByAgency(idAgency:string):Observable<any>{
  return this.http.get<any>(`http://localhost:3000/need-transfer/agency/${idAgency}`)
    }

}
