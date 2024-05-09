import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private authService : LoginService   ) { }





  async addNotif(notifData: any): Promise<any> {
   
  
  return this.http.post<any>('http://localhost:3000/notifications/add', notifData, { headers: { 'Content-Type': 'application/json' } }).toPromise();
     
  }

  getNotif(){
    return this.http.get<any>('http://localhost:3000/notifications');
  }

  getNotifByAgency(idAgency:string){
    return this.http.get<any[]>(`http://localhost:3000/notifications/agency/${idAgency}`)
  }

  updateNotif(id:string, notif:any):Observable<any>{

    return this.http.patch<any>(`http://localhost:3000/notifications/${id}`, notif, { headers: {'Content-Type': 'application/json'} })
    }
    getNotifById(id:string):Observable<any>{
      return this.http.get<any>(`http://localhost:3000/notifications/${id}`)
        }
  
        updateTransfer(id:string, transfer:any):Observable<any>{

          return this.http.patch<any>(`http://localhost:3000/transfers/${id}`, transfer, { headers: {'Content-Type': 'application/json'} })
          }

          getTransferById(id:string):Observable<any>{
            return this.http.get<any>(`http://localhost:3000/transfers/${id}`)
              }
}
