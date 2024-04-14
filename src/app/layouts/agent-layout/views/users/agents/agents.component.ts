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
  deleteAgent(id: string): void {
    const confirmation = window.confirm('You want to delete this Agent ?');
    if (confirmation) {
  
      this.shareService.deleteAgent(id).subscribe(() => {
        this.message = "isDeleted";
  
        this.delete1=true;
        console.log(this.delete1, this.message);
        
       // this.router.navigate(['/'])
      // console.log(this.delete)
      //  this.loadUsers();
       
      
        },
        error => {
          console.error('Erreur lors de la suppression de Transfer :', error);
        }
      );
    } else {
   
      console.log('Suppression annulée');
    }
  }

}
