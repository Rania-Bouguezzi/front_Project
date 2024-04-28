import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgentsService } from './agents.service';
import { AvatarModule } from '@coreui/angular';
import { LoginService } from 'src/app/pages/login/login.service';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule, AvatarModule,DataTablesModule],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.scss'
})
export class AgentsComponent {
  agents:any[]=[];
  message:string="";
  delete1:boolean=false;
  idAgency:string="";
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  agentId:string="";
  firstname:string="";
  lastname:string="";
  email:string="";
  dateCreation:string="";
  avatar:string="";
  nameSpa:string="";
  avatarSpa:string="";
  agentData:any;
  status:string="";

  constructor(private shareService : AgentsService, private authService:LoginService){}
  
  
  
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
    
    };
    this.loadagents();
  }
  
  loadagents(): void {
    this.authService.getTokenData().subscribe(
      (response) => {
        this.idAgency= response.agency.id;
       console.log(this.idAgency)
     
     
    
    this.shareService.getAgentByAgency(this.idAgency).subscribe(
      (data: any[]) => {
        this.agents = data; 
        this.dtTrigger.next(null);
      },
      (error) => {
        console.error('Erreur lors de la récupération des transfers :', error);
      }
    ); })
  }
  
  
  Details(id: string): void {
    this.agentId = id;    
    this.shareService.getById(this.agentId).subscribe(data => {
      this.agentData = data;
      this.firstname=data.firstname;
      this.lastname=data.lastname;
      this.email=data.email;
      this.dateCreation= data.dateCreation;
      this.avatar=data.picture;
      this.nameSpa= data.super_agent.firstname + ' ' + data.super_agent.lastname;
      this.avatarSpa=data.super_agent.picture;
      this.status=data.status;
      // Open the update modal here
      const modal = document.getElementById('ModalUpdate');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
      }
    }, error => {
      console.error('Error retrieving bus data:', error);
    });
  }
  
}
