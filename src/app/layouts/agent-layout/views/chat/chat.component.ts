import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@coreui/angular';
import Pusher from "pusher-js"
import { LoginService } from 'src/app/pages/login/login.service';
import {ChatService} from './chat.service'
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
  selectedAgentId: string | null = null;

  constructor(private http: HttpClient,  private authService : LoginService, private chatService : ChatService) {
    
    this.authService.getTokenData().subscribe(
      (response) => {
        this.username= response.firstname + ' ' + response.lastname;
        this.logo = response.agency.logo;
        this.agencyName=response.agency.name;
        this.agencyId=response.agency.id;
        this.userEmetteur = response.id;
      
      })
      this.chatService.getAllAgent().subscribe((data) => {this.agents=data
        this.agents = data.filter(agent => agent.agency.id !== this.agencyId);
  
  
      })
    
 
  }
  ngOnInit(): void {
   
    this.fetchMessages(this.userEmetteur, this.userRecepteur);
    
    Pusher.logToConsole = true;

    const pusher = new Pusher('40c72b14f719befa9bcf', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: { username: string, logo:string, agencyName:string,userRecepteur:string,userEmetteur:string, message: string }) => {
      this.messages.push(data);
  
     
    });
    this.getAgent();
  }
  fetchMessages(idEmetteur:string, idRecepteur:string): void {
    this.http.get<{ username: string, logo:string, agencyName:string,userRecepteur:string,userEmetteur:string, message: string }[]>(`http://localhost:3000/pusher/messages/${idEmetteur}/${idRecepteur}`)
      .subscribe(
        (data) => {
          this.messages = data;
        
        },
        (error) => {
          console.error('Failed to fetch messages', error);
        }
      );
  }
  count=0;
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
        this.message = ''; 
        this.count=1;
      });
    }
  }
agents:any[]=[];
  getAgent():void{
    this.http.get<any[]>("http://localhost:3000/agent").subscribe((data) => {this.agents=data
      this.agents = data.filter(agent => agent.agency.id !== this.agencyId);


    })}
agency='';
logoAgency=''

    idAgency(id:string){
      console.log(id);
      this.userRecepteur=id;
      this.http.get<any[]>(`http://localhost:3000/agent/${id}`).subscribe((data :any) => {this.agency=data.agency.name;
        this.logoAgency=data.agency.logo;
        this.selectedAgentId = id; 
      });
      console.log("user Recepteur is ", this.userRecepteur);
      this.fetchMessages(this.userEmetteur,this.userRecepteur);
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


