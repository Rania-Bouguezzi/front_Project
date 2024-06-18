import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@coreui/angular';
import Pusher from "pusher-js"
import { LoginService } from 'src/app/pages/login/login.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, AvatarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  username = '';
  logo='';
  agencyName='';
  message = '';
  userRecepteur='';
  userEmetteur='';
  agencyId='';
  messages: { username: string, logo:string, agencyName: string, message: string }[] = [];
  roomId = '';
  searchTerm: string = '';

  constructor(private http: HttpClient,  private authService : LoginService) {
    
    this.authService.getTokenData().subscribe(
      (response) => {
        this.username= response.firstname + ' ' + response.lastname;
        this.logo = response.agency.logo;
        this.agencyName=response.agency.name;
        this.agencyId=response.agency.id;
        this.userEmetteur = response.id;
      
      })
      this.http.get<any[]>("http://localhost:3000/agent").subscribe((data) => {this.agents=data
        this.agents = data.filter(agent => agent.agency.id !== this.agencyId);
  
  
      })
    
 
  }
  ngOnInit(): void {
    this.loadMessagesFromLocalStorage();
    this.fetchMessages(this.userEmetteur, this.userRecepteur);
    
    Pusher.logToConsole = true;

    const pusher = new Pusher('40c72b14f719befa9bcf', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: { username: string, logo:string, agencyName:string,userRecepteur:string,userEmetteur:string, message: string }) => {
      this.messages.push(data);
      this.saveMessagesLocally();
      localStorage.setItem('messages', JSON.stringify(this.messages));
    });
    this.getAgent();
  }
  fetchMessages(idEmetteur:string, idRecepteur:string): void {
    this.http.get<{ username: string, logo:string, agencyName:string,userRecepteur:string,userEmetteur:string, message: string }[]>(`http://localhost:3000/pusher/messages/${idEmetteur}/${idRecepteur}`)
      .subscribe(
        (data) => {
          this.messages = data;
          this.saveMessagesLocally(); 
        },
        (error) => {
          console.error('Failed to fetch messages', error);
        }
      );
  }
  submit(): void {
    if (this.message.trim() !== '') {
      this.http.post('http://localhost:3000/pusher/messages', {
        username: this.username,
        logo: this.logo,
        agencyName:this.agencyName,
        userRecepteur:this.userRecepteur,
        userEmetteur:this.userEmetteur,
        message: this.message
      }).subscribe(() => {
        this.message = ''; // Clear the input field after submitting the message
      });
    }
  }
agents:any[]=[];
  getAgent():void{
    this.http.get<any[]>("http://localhost:3000/agent").subscribe((data) => {this.agents=data
      this.agents = data.filter(agent => agent.agency.id !== this.agencyId);


    })}


    idAgency(id:string){
      console.log(id);
      this.userRecepteur=id;
      console.log("user Recepteur is ", this.userRecepteur);
      this.fetchMessages(this.userEmetteur,this.userRecepteur);
    }

    saveMessagesLocally(): void {
      localStorage.setItem('chatMessages', JSON.stringify(this.messages));
    }
  
    loadMessagesFromLocalStorage(): void {
      const storedMessages = localStorage.getItem('chatMessages');
      if (storedMessages) {
        this.messages = JSON.parse(storedMessages);
      }
    }


    filterAgencys(): void {
      if (!this.searchTerm || this.searchTerm.trim() == '') {
        this.getAgent(); 
        return;
      }
    
      this.agents = this.agents.filter((agent: any) =>
        agent.agency.name &&  agent.agency.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    onSearch(event: any): void {
      this.searchTerm = event.target.value;
      this.filterAgencys();
    }
    





  }


