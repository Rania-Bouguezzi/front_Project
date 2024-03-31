import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgentsService } from './agents.service';
import { AvatarModule } from '@coreui/angular';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.scss'
})
export class AgentsComponent {
  agents:any[]=[];
  message:string="";
  delete1:boolean=false;
  constructor(private shareService : AgentsService){}
  
  
  
  ngOnInit(): void {
    this.loadagents();
  }
  
  loadagents(): void {
    this.shareService.getAll().subscribe(
      (data: any[]) => {
        this.agents = data; // Stocke les buses récupérés dans une variable locale
        console.log(data)
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des agents :', error);
      }
    );
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
