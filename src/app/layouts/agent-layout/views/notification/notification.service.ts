import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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


}
