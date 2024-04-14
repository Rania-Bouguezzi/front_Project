import { Component } from '@angular/core';
import {AgentLayoutService} from './agent-layout.service'
import { AvatarModule } from '@coreui/angular';
import { TransfersComponent } from './views/transfers/transfers.component';
import { TransfersService } from './views/transfers/transfers.service';
import { LoginService } from 'src/app/pages/login/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-layout',
  standalone: true,
  imports: [AvatarModule, CommonModule],
  templateUrl: './agent-layout.component.html',
  styleUrl: './agent-layout.component.scss'
})
export class AgentLayoutComponent {

  firstname : string ='';
  lastname : string ='';
  email : string ='';
  picture : string ='';
  transfer:any[]=[];
  logo: string='';
  agencyName:string='';
  time:string='';
  currentDate: any;
  transfers:any[]=[];
    constructor (private tokenService : AgentLayoutService, private transferService :TransfersService , 
   ){
 
   }
  
   ngOnInit(): void {
    this.tokenService.getTokenData().subscribe(
      (tokenData) => {
       // console.log('Données du token:', tokenData);
        this.firstname = tokenData.firstname;
        this.lastname = tokenData.lastname;
        this.email = tokenData.email;
        this.picture = tokenData.picture;


      },
      (error) => {
        console.error('Erreur lors de la récupération des données du token:', error);
      }
    );
    this.transferService.transferData$.subscribe((data) => {
      this.transfer = data; 

      
      this.currentDate= new Date();

 
 this.loadSharedTransfers();

this.time=this.transferService.time;
      
    });
 
    
    // this.authService.getTokenData().subscribe(
    //   (response) => {
    //     this.agencyName = response.agency.name;
    //     this.logo= response.agency.logo;
    //     console.log(this.logo);
    //   });

    }


    loadSharedTransfers(): void {
      const sharedTransfersData = localStorage.getItem('sharedTransfers');
      if (sharedTransfersData) {
        const transfers = JSON.parse(sharedTransfersData);
          this.transfers = transfers.sort((a: any, b: any) => {
      return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
    });
    console.log(this.transfers);
      }
     
       else {
        this.transfers = [];
      }
    }




    deleteTransfer(transferId: string): void {
      const sharedTransfersData = localStorage.getItem('sharedTransfers');
      if (sharedTransfersData) {
        const transfers = JSON.parse(sharedTransfersData);
        const updatedTransfers = transfers.filter((transfer: any) => transfer.id !== transferId);
        localStorage.setItem('sharedTransfers', JSON.stringify(updatedTransfers));
        // Mettez à jour également la liste des transferts dans votre composant si nécessaire
        this.transfers = updatedTransfers;
      }
    }
    
    
}