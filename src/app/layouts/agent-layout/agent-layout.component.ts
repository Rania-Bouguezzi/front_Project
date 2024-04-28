import { Component } from '@angular/core';
import {AgentLayoutService} from './agent-layout.service'
import { AvatarModule } from '@coreui/angular';
import { TransfersService } from './views/transfers/transfers.service';
import { CommonModule, formatDate } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultHeaderService } from 'src/app/containers/default-layout/default-header/default-header.service';
import { Router } from '@angular/router';
import { NeedsTransferService } from './views/needs-transfer/needs-transfer.service';
import {NotificationService} from './views/notification/notification.service';
import { NavbarComponent } from './views/navbar/navbar.component';
@Component({
  selector: 'app-agent-layout',
  standalone: true,
  imports: [AvatarModule, CommonModule,FormsModule,ReactiveFormsModule,  NavbarComponent,],
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
  logoToken: string='';
  agencyName:string='';
  time:string='';
  currentDate: any;
  transfers:any[]=[];
  searchTermDestination: string = '';
  searchTermDepart: string = '';
  from:string='';
  to:string='';
  arrive:string='';
  depart:string='';
  nbplaces:number=0;
  pricePlace:number=0;
  etat:string='';
  note:string='';
  extra:number=0;
  status:string='';
  isExpired:boolean=false;
  showInputnbPlace: boolean = false;
  showPrice: boolean = false;
  placeNumber:number=0;
  TotalPrice:number=0;
  villes:any;
  moreNb:boolean=false;
  message:string="";
  isFirstClick: boolean = true;
  sendMessage:string="";
  sendMessageBool:boolean=false;
  emptymessage:boolean=false;
  agencyId:string='';
  transferAgencyId:string='';
  agentEmetteurNotifId :string='';
  agentRecepteurNotifId :string='';
  agencyNameDetails:string='';
  myFormTransfer = new FormGroup({
    text: new FormControl('', Validators.required),
  });


    constructor (private tokenService : AgentLayoutService, private transferService :TransfersService , 
    private tokenLogout:  DefaultHeaderService, private router:Router, private  shareService : NeedsTransferService,
    private notifService : NotificationService ){}
   
  
   ngOnInit(): void {
    this.loadVille();
    this.tokenService.getTokenData().subscribe(
      (tokenData) => {
       // console.log('Données du token:', tokenData);
        this.firstname = tokenData.firstname;
        this.lastname = tokenData.lastname;
        this.email = tokenData.email;
        this.picture = tokenData.picture;
        this.logoToken= tokenData.agency.logo;
        this.agencyName=tokenData.agency.name;
        this.agencyId=tokenData.agency.id;
    


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
      const confirmation = window.confirm('You want to delete this Transfer ?');
      if (confirmation) {
      const sharedTransfersData = localStorage.getItem('sharedTransfers');
      if (sharedTransfersData) {
        const transfers = JSON.parse(sharedTransfersData);
        const updatedTransfers = transfers.filter((transfer: any) => transfer.id !== transferId);
        localStorage.setItem('sharedTransfers', JSON.stringify(updatedTransfers));
        // Mettez à jour également la liste des transferts dans votre composant si nécessaire
        this.transfers = updatedTransfers;
      } }
    else{
      console.log("suppression annulée")
    }}
  


    searchTransferByDestination(destination: string): void {
      if (!destination.trim()) {
     
        this.loadSharedTransfers();
      
      }
    
   
      this.transfers = this.transfers.filter(transfer =>
        transfer.to.toLowerCase().includes(destination.toLowerCase())
      );
    }
    searchTransferByDepart(depart: string): void {
      if (!depart.trim()) {
     
        this.loadSharedTransfers();
      
      }
    
   
      this.transfers = this.transfers.filter(transfer =>
        transfer.from.toLowerCase().includes(depart.toLowerCase())
      );
    }

    onSearchDestination(event: KeyboardEvent): void {
     
      if (this.searchTermDestination.trim() === '') {
       
        this.loadSharedTransfers();
      }
      this.transfers = this.transfers.filter(transfer =>
        transfer.to.toLowerCase().includes(this.searchTermDestination.toLowerCase())
      );
    }
    onSearchDepart(event: KeyboardEvent): void {
     
      if (this.searchTermDepart.trim() === '') {
       
        this.loadSharedTransfers();
      }
      this.transfers = this.transfers.filter(transfer =>
        transfer.from.toLowerCase().includes(this.searchTermDepart.toLowerCase())
      );
    }

    logout(){
       this.tokenLogout.logOut().subscribe(
        (tokenData) => {
      console.log('Données du token:', tokenData);
      
        },
        (error) => {
          console.error('Erreur lors de la récupération des données du token:', error);
        }
      );
    
       this.router.navigate(['/login']);
    }



    details(id:string){
      console.log( this.transferService.getById(id).subscribe(
        (data) => {
      console.log('Données du tranfsert:', data);
      this.agentRecepteurNotifId = data.agent.id;
      this.logo= data.agency.logo;
      this.agencyNameDetails= data.agency.name;
      this.to=data.to;
      this.from=data.from;
      this.arrive=data.date_time_Arrive;
      this.depart=data.date_time_Depart;
      this.nbplaces=data.nbrePlacesDisponibles;
      this.pricePlace=data.priceTransferForPerson;
      this.note=data.note;
      this.extra=data.extra;
      this.status=data.status;
      const currentDate = new Date();
    const arrival = new Date(this.arrive);
   if (arrival < currentDate)
    {this.isExpired=true;
      this.etat='Not Available'
      this
    }
   else{this.isExpired=false;
    this.etat=data.etatTransfer;
   }
  
        },
        (error) => {
          console.error('Erreur lors de la récupération des données du token:', error);
        }
      ));
    }


    onReserveClick(): void {
      if (this.isFirstClick) {

        this.showInputnbPlace = true;
        this.showPrice = true;
        this.isFirstClick = false;
      } else {
        const messageNotif = ' hope to reserve ' + this.placeNumber + ' places for the transfer from ' + this.from  +' to ' + this.to + ' which departing on ' + formatDate(this.depart, 'MMM dd, yyyy, h:mm:ss a', 'en-US'); ;
        const notifData = {
          agentId: this.agentRecepteurNotifId,
          message: messageNotif,
          agencyEmettriceName : this.agencyName,
          agencyEmettriceLogo: this.logoToken

        };
      
          try {
            const response = this.notifService.addNotif(notifData);
            console.log('agentNotifId :' + this.agentRecepteurNotifId);
            console.log('agentId :' + notifData.agentId);
        
            console.log('Notif created:', response);
            this.message = "Notif Created!";
          } catch (error) {
            console.log('Error creating Notif:', error);        
          }

        this.sendMessageBool = true;
  this.sendMessage="Your request has been sent successfully";

  this.placeNumber=0;
  this.TotalPrice=0;

       
      }
    
      
    }
    onModalHidden(): void {
      this.sendMessageBool = false; 
    }
    
    calculateTotalPrice(): void {
      if (this.placeNumber > this.nbplaces) {
        this.moreNb = true;
        this.message="number of places should be smaller than available places !";
        this.TotalPrice = 0; 
        return;
      } 
      if (this.placeNumber) {
          this.TotalPrice = (this.placeNumber * this.pricePlace ) + this.extra;
          this.moreNb = false; 
       
      } else {
          this.TotalPrice = 0; 
      }


}


loadVille():void{
  this.tokenService.getVille().subscribe(
    (data: any[]) => {
      this.villes = data; 
      console.log(this.villes);
      
    },
    (error) => {
      console.error('Erreur lors de la récupération des villes :', error);
    }
  );
}


async onSubmit() {
  if (this.myFormTransfer.invalid) {
    return;
  }

  const transferData = this.myFormTransfer.value;
  console.log(transferData);

  try {
    const response = await this.shareService.addTransfer(transferData);

    console.log('Transfer created:', response);
    this.message = "Request will be publish!";
    this.emptymessage = true;
    this.myFormTransfer.reset();
    this.router.navigate(['/agent-layout/needs-transfer']);
  } catch (error) {
    console.error('Error creating transfer:', error);
    this.message = "Request will not be publish!";
   
  }

}






}