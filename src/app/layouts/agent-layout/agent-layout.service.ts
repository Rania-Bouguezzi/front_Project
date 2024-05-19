import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginService } from 'src/app/pages/login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AgentLayoutService {
  private sharedTransfers: any[] = [];

  constructor( private http : HttpClient, private authService : LoginService) { }


 



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

  getSharedMission(){
    return this.http.get<any[]>('http://localhost:3000/missions/shared/Mission')
  }

async  addComment(commentData : any , MissionId : string): Promise<any> {
    try {
      const response = await this.authService.getTokenData().toPromise();
      const idAgent = response.id;
      commentData.agentId = idAgent;
      commentData.missionId = MissionId;
      console.log('mission Data Id',commentData.missionId);
  

      return this.http.post<any>('http://localhost:3000/feedbacks/add', { ...commentData, MissionId }, { headers: { 'Content-Type': 'application/json' } }).toPromise();
    } catch (error) {
      console.error('Error adding feedback:', error);
      throw error;
    }
  }
 
  
  getFeedbackByMission(idMission:string){
    return this.http.get<any[]>(`http://localhost:3000/feedbacks/mission/${idMission}`)
  }
}
