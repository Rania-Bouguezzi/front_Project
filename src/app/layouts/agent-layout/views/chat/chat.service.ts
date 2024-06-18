import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/pusher';

  constructor(private http: HttpClient) {}

  sendMessage(sender: string, receiver: string, message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages`, { sender, receiver, message });
  }

  getMessages(user1: string, user2: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages`, { params: { user1, user2 } });
  }


  getAllAgent(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/agent");
  }
}
