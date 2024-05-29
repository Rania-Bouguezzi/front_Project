import { Component } from '@angular/core';
import { NotificationService } from './notification.service';
import { CommonModule, formatDate } from '@angular/common';
import { AvatarModule } from '@coreui/angular';
import { LoginService } from 'src/app/pages/login/login.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  notifs :any[]=[];
  notif :any;
agencyId:string='';
agencyName:string='';
agencyLogo:string='';
agentId:string='';
agentEmetteurId:string='';
count:number=0;
notifAccept:boolean=false;
notifRefus:boolean=false;
notifCollab:boolean=false;
transfer:any;
placesDispo:number=0;
placesDispoTransfer:number=0;
availability:string='';
validate:boolean=false;



  constructor( private notifService : NotificationService, private tokenService : LoginService){}


  ngOnInit(): void {

  this.getNotif();


  
  }

  getNotif() : void{
    this.tokenService.getTokenData().subscribe(
      (response) => {
        this.agencyId= response.agency.id;
        this.agencyName = response.agency.name;
        this.agencyLogo = response.agency.logo;
        this.agentEmetteurId = response.id;

      
     
     
    
    this.notifService.getNotifByAgency(this.agencyId).subscribe(
      (data: any[]) => {
        this.notifs = data;
        this.notifs = this.notifs.sort((a: any, b: any) => {
          return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
        }); 
        this.count = data.length;
        console.log(this.count)
       
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications :', error);
      }
    ); })
  }

  accept(id:string){
 this.notifService.getNotifById(id).subscribe(
  (data: any[]) => {
    this.notif = data; 
    this.agentId = this.notif.agentEmetteurId;   
    const notifUpdate = {
      validate: true,
    response: 'Accepted'
    }
this.notifService.updateNotif(this.notif.id,notifUpdate ).subscribe(
  () => {
  });
console.log(this.notif)
console.log(this.notif.validate);
     this.notifService.getTransferById(this.notif.transferId).subscribe(
      (data: any[]) => {
        this.transfer = data; 

      

           if  (  ( this.transfer.nbrePlacesDisponibles - this.notif.nbPlaces) ==0)
      { this.placesDispoTransfer =  0
        this.availability='Not Available'}
    else {  this.placesDispoTransfer = ( this.transfer.nbrePlacesDisponibles - this.notif.nbPlaces) ;
      this.availability='Available'}   
      const messageNotif = ' accepts your transfer request '+ this.notif.nbPlaces + ' places from ' + this.notif.from + ' to ' + this.notif.to + ' which departing on ' +formatDate(this.notif.date_time, 'MMM dd, yyyy, h:mm:ss a', 'en-US');
  
   
      const notifData = {
       agentId: this.agentId,
       message: messageNotif,
       agentEmetteurId:this.agentEmetteurId,
       agencyEmettriceId: this.agencyId,
       agencyEmettriceName : this.agencyName,
       agencyEmettriceLogo: this.agencyLogo,
       from:this.notif.from,
       to:this.notif.to,
       nbPlaces:this.notif.nbPlaces,
       date_time:this.notif.date_time,
       notifAccept:true,
       notifRefus:false,
       transferId:this.notif.transferId,
       response:'Accepted'

      
 
     };
 
       try {
         const response = this.notifService.addNotif(notifData);
        
     this.notifAccept=true;
 
 
       console.log(this.placesDispoTransfer );
       console.log(this.availability );
     const transferUpdate = {
       nbrePlacesDisponibles:this.placesDispoTransfer,
       etatTransfer:this.availability
     };
 
     this.notifService.updateTransfer(this.notif.transferId, transferUpdate).subscribe(
       () => {
        
       
        
   
       });
 
     
         console.log('Notif created:', response);
 
    
       } catch (error) {
         console.log('Error creating Notif:', error);        
       }
      },)
     
    });
    
      this.count= this.count-1;
  }

   



  

  supp(id:string){
    this.notifService.getNotifById(id).subscribe(
     (data: any[]) => {
       this.notif = data; 
       this.agentId = this.notif.agentEmetteurId;   
        console.log(this.notif.agent.id);
       const messageNotif = ' refuses your transfer request '+ this.notif.nbPlaces + ' places from ' + this.notif.from + ' to ' + this.notif.to + ' which departing on ' +formatDate(this.notif.date_time, 'MMM dd, yyyy, h:mm:ss a', 'en-US');
       
       const notifUpdate ={validate:true, response: 'Refused'}
       this.notifService.updateNotif(this.notif.id,notifUpdate ).subscribe(
        () => {});
        const notifData = {
         agentId: this.agentId,
         message: messageNotif,
         agentEmetteurId:this.agentEmetteurId,
         agencyEmettriceId: this.agencyId,
         agencyEmettriceName : this.agencyName,
         agencyEmettriceLogo: this.agencyLogo,
         from:this.notif.from,
         to:this.notif.to,
         nbPlaces:this.notif.nbPlaces,
         date_time:this.notif.date_time,
         notifAccept:false,
         notifRefus:true,
         transferId:this.notif.transferId,
         response:'Refused'
   
   
       };
     
         try {
           const response = this.notifService.addNotif(notifData);
   
       this.notifRefus=true;
           console.log('Notif created:', response);
      
         } catch (error) {
           console.log('Error creating Notif:', error);        
         }
     
        
      
     },
     (error) => {
       console.error('Erreur lors de la récupération des transfers :', error);
     }
   ); 
   
    
   this.count= this.count-1;
     }
   

  }
  




