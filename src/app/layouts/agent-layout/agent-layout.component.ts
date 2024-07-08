import { Component } from '@angular/core';
import {AgentLayoutService} from './agent-layout.service'
import { AvatarModule } from '@coreui/angular';
import { TransfersService } from './views/transfers/transfers.service';
import { CommonModule, formatDate } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NeedsTransferService } from './views/needs-transfer/needs-transfer.service';
import {NotificationService} from './views/notification/notification.service';
import { NavbarComponent } from './views/navbar/navbar.component';
import { LoginService } from 'src/app/pages/login/login.service';
import { MissionsService } from './views/missions/missions.service';
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
  mission:any[]=[];
  logo: string='';
  logoToken: string='';
  agencyName:string='';
  time:string='';
  currentDate: any;
  transfers:any[]=[];
  searchTermDestination: string = '';
  searchTermDepart: string = '';
  searchTermDate: string = '';
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
  transfer_agency_id:string='';
  agentEmetteurNotifId :string='';
  agentRecepteurNotifId :string='';
  agencyNameDetails:string='';
  TransferEtat:boolean=false;
  missions:any[]=[];
  showComments = false; 
  myFormTransfer = new FormGroup({
    text: new FormControl('', Validators.required),
  });

  
    constructor (private tokenService : AgentLayoutService, private transferService :TransfersService , 
     private router:Router, private  shareService : NeedsTransferService,
    private notifService : NotificationService , private authService : LoginService, private missionService :MissionsService , ){}
    
  
   ngOnInit(): void {
    this.loadVille();
    this.authService.getTokenData().subscribe(
      (tokenData) => {
        this.firstname = tokenData.firstname;
        this.lastname = tokenData.lastname;
        this.email = tokenData.email;
        this.picture = tokenData.picture;
        this.logoToken= tokenData.agency.logo;
        this.agencyName=tokenData.agency.name;
        this.agencyId=tokenData.agency.id;
        this.agentEmetteurNotifId = tokenData.id;
    console.log('agency Id'+this.agencyId);


      },
      (error) => {
        console.error('Erreur lors de la récupération des données du token:', error);
      }
    );
    this.transferService.transferData$.subscribe((data) => {
      this.transfer = data; 
  
      
      this.currentDate= new Date();

 
 this.loadTransfers();
 this.loadMissions();
 //this.getFeedbacks();

this.time=this.transferService.time;


      
    });
 
    


    }


    // loadSharedTransfers(): void {
    //   const sharedTransfersData = localStorage.getItem('sharedTransfers');
    //   if (sharedTransfersData) {
    //     const transfers = JSON.parse(sharedTransfersData);
    //       this.transfers = transfers.sort((a: any, b: any) => {
    //   return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
    // });
    // console.log(this.transfers);
    //   }
     
    //    else {
    //     this.transfers = [];
    //   }
    // }

    loadTransfers(): void {
      this.authService.getTokenData().subscribe(
        (response) => {
          this.agencyId= response.agency.id;
         console.log(this.agencyId)
       
       
      
      this.tokenService.getSharedTransfer().subscribe(
        (data: any[]) => {
          this.transfers = data.sort((a: any, b: any) => {
            return new Date(b.dateShare).getTime() - new Date(a.dateShare).getTime();
          });
         
        },
        (error) => {
          console.error('Erreur lors de la récupération des transfers :', error);
        }
      ); })
    }
    
    loadMissions(): void {
      this.authService.getTokenData().subscribe(
        (response) => {
          this.agencyId= response.agency.id;
        
       
       
      
      this.tokenService.getSharedMission().subscribe(
        (data: any[]) => {
          this.missions = data.sort((a: any, b: any) => {
            return new Date(b.dateShare).getTime() - new Date(a.dateShare).getTime();
      
          });
         
        },
        (error) => {
          console.error('Erreur lors de la récupération des missions :', error);
        }
      ); })
    }
  


    deleteMission(missionId: string): void {
      const confirmation = window.confirm('You want to delete this Mission ?');
      if (confirmation) {
        this.missionService.getById(missionId).subscribe(
          (data: any) => {
            this.mission = data;
            const updateMission = 
            {isShared :false,
             
            }
    
            this.missionService.updateMissions(missionId, updateMission).subscribe(
              () => {
               
                this.message='Mission Updated!'
          
              },)});
            
             return this.loadMissions();
      }
     
    else{
      console.log("suppression annulée")
    }
    
  }
  


    searchTransferByDestination(destination: string): void {
      if (!destination.trim()) {
     
        this.loadTransfers();
      
      }
    
   
      this.transfers = this.transfers.filter(transfer =>
        transfer.to.toLowerCase().includes(destination.toLowerCase())
      );
    }
    searchTransferByDepart(depart: string): void {
      if (!depart.trim()) {
     
        this.loadTransfers();
      
      }
    
   
      this.transfers = this.transfers.filter(transfer =>
        transfer.from.toLowerCase().includes(depart.toLowerCase())
      );
    }

    onSearchDestination(event: KeyboardEvent): void {
     
      if (this.searchTermDestination.trim() === '') {
       
        this.loadMissions();
      }
    
      this.missions = this.missions.filter(mission =>
        mission.to.toLowerCase().includes(this.searchTermDestination.toLowerCase()) ||
        mission.transfers.some((transfer : any) => transfer.to.toLowerCase().includes(this.searchTermDestination.toLowerCase()))
      );
    }

    onSearchDate(event: KeyboardEvent): void {
     
      if (this.searchTermDate.trim() === '') {
       
        this.loadMissions();
      }
    
      this.missions = this.missions.filter(mission =>
        mission.date_time_start.includes(this.searchTermDate) 
      );
    }
    onSearchDepartByTransfers(event: KeyboardEvent): void {
     
      if (this.searchTermDepart.trim() === '') {
       
        this.loadMissions();
      }

      this.missions = this.missions.filter(mission =>
        mission.from.toLowerCase().includes(this.searchTermDepart.toLowerCase()) ||
        mission.transfers.some((transfer : any) => transfer.from.toLowerCase().includes(this.searchTermDepart.toLowerCase()))
      );
    }

    
 

    detailsTransfer(id:string){
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
      this.transferAgencyId=data.id;
      this.transfer_agency_id=data.agency.id;
      console.log('transferAgencyId'+this.transfer_agency_id);
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
   if (data.etatTransfer =='Not Available'  )
    { this.TransferEtat=true;
     
    }
        },
        (error) => {
          console.error('Erreur lors de la récupération des données du token:', error);
        }
      ));
    }


  transfersMission : any ;
  name:string='';
  dateMission : string ='';
  dateCreationMission: string='';
  fromMission : string ='';
  toMission : string='';
  etatMission : string ='';

detailsMission(id:string){
  console.log( this.missionService.getById(id).subscribe(
    (data) => {
      this.logo= data.agent.agency.logo;
      this.agencyNameDetails= data.agent.agency.name;
      this.toMission=data.to;
      this.fromMission=data.from;
      this.transfersMission=data.transfers;
      this.dateMission=data.dateMission;
      this.dateCreationMission=data.dateCreation;
      this.etatMission = data.etatMission;

    }
  )
  )
  return this.loadMissions();
}


 INvalidateInput(event: any): void {
   
  }


isNul:boolean=false;
    onReserveClick(): void {
      if (this.isFirstClick) {

        this.showInputnbPlace = true;
        this.showPrice = true;
        this.isFirstClick = false;
        console.log(this.placeNumber);
      } else {
        const messageNotif = ' hope to reserve ' + this.placeNumber + ' places for the transfer from ' + this.from  +' to ' + this.to + ' which departing on ' + formatDate(this.depart, 'MMM dd, yyyy, h:mm:ss a', 'en-US'); ;
        const notifData = {
          agentId: this.agentRecepteurNotifId,
          message: messageNotif,
          agencyEmettriceId : this.agencyId,
          agencyEmettriceName : this.agencyName,
          agencyEmettriceLogo: this.logoToken,
          agentEmetteurId : this.agentEmetteurNotifId,
          from:this.from,
          to:this.to,
          nbPlaces:this.placeNumber,
          date_time:this.depart,
          notifAccept:false,
          notifRefus:false,
          transferId:this.transferAgencyId,
          validate:false,
          place:this.placeNumber

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
  
  priceNul : boolean=false;  
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
      if(this.TotalPrice==0)
        {this.priceNul=true}else{this.priceNul=false}


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



selectedMissionId:string='';

showDivComment(id:string){
  this.selectedMissionId = id;
  this.showComments = true;
  return this.getFeedbacks(id);

}
myFormComment = new FormGroup({
  text: new FormControl('', Validators.required),});

async comment (idMission : string){
  if (this.myFormComment.invalid) {
    return;
  }

  const commentData = this.myFormComment.value;
console.log(idMission)
console.log(commentData);
  try {
    const response = await this.tokenService.addComment(commentData, idMission);

    console.log('comment created:', response);
    this.myFormComment.reset();
  } catch (error) {
    console.error('Error creating comment:', error);

   
  }
  return this.getFeedbacks(idMission);
}

feedbacks : any[]=[];
idMission:string = '';
currentDateComment: Date = new Date();
commentDate : string ='';
getFeedbacks(idMission : string){  
  this.tokenService.getFeedbackByMission(idMission).subscribe(
    (data: any[]) => {
      this.feedbacks = data.sort((a: any, b: any) => {
        return new Date(b.dateShare).getTime() - new Date(a.dateShare).getTime();
      });
     
    },
    (error) => {
      console.error('Erreur lors de la récupération des feedbacks :', error);
    }
  ); }


agencyProfile(id:string){
  console.log(id);
}

}

