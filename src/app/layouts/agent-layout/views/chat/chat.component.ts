import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Pusher from "pusher-js"
import { LoginService } from 'src/app/pages/login/login.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  username = '';
  message = '';
  messages: { username: string, message: string }[] = [];



  constructor(private http: HttpClient,  private authService : LoginService) {
    this.authService.getTokenData().subscribe(
      (response) => {
        this.username= response.firstname + response.lastname;})
    
 
  }

  ngOnInit(): void {
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      this.messages = JSON.parse(storedMessages);}
    Pusher.logToConsole = true;

    var pusher = new Pusher('40c72b14f719befa9bcf', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data : { username: string, message : string }) => {
      this.messages.push(data);
      localStorage.setItem('messages', JSON.stringify(this.messages));
      
    });
  }


  submit(): void {
    if (this.message.trim() !== '') {
      this.http.post('http://localhost:3000/pusher/messages', {
        username: this.username,
        message: this.message
      }).subscribe(() => {
        localStorage.setItem('messages', JSON.stringify(this.messages));
        this.message = '';
      });
    }
  }

}
