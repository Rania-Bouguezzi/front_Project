import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransfersService } from './transfers.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AvatarModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/login/login.service';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { AgentLayoutService } from '../../agent-layout.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [CommonModule, FormModule,CardModule, GridModule,ReactiveFormsModule,DataTablesModule, AvatarModule ],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.scss'
})
export class TransfersComponent implements OnInit {

   transfer:any;
   id : string ='';
  emptymessage:boolean=false;
  message:string="";
  transfers:any[]=[];
  villes:any[]=[];
  delete1:boolean=false;
  TransferId:string="";
  TransferData:any;
  idAgency:string="";
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  from:string='';
  to:string='';
  arrive:string='';
  depart:string='';
  nbplaces:string='';
  pricePlace:number=0;
  etat:string='';
  note:string='';
  extra:number=0;
  status:string='';
  avatar:string='';
  firstName:string='';
  lastName:string='';
  dateCreation:string='';
  isExpired:boolean=false;
  shareTime:string='';
  isShared:boolean=false;
  notifications:any[]=[];
  currentDateString : any;
  notif:any;
agentId:string='';
placesDispoTransfer:number=0;
availability:string='';
validate:boolean=false;
notifAccept:boolean=false;
notifRefus:boolean=false;
agencyId:string='';
agencyName:string='';
agencyLogo:string='';
agentEmetteurId:string='';
 dateTime : any = new Date().toISOString().slice(0, 16);
 validateDates(formGroup: FormGroup) {
  const dateDepart = formGroup.get('date_time_Depart')?.value;
  const dateArrive = formGroup.get('date_time_Arrive')?.value;

  if (dateDepart < dateArrive) {
    
    console.log('oui');
  } else {
   
    console.log('non');
  }
}

  myFormTransfer = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    date_time_Depart: new FormControl(this.dateTime, Validators.required),
    date_time_Arrive: new FormControl(this.dateTime,  [Validators.required]),
    nbrePlacesOccupees: new FormControl('', Validators.required),
    priceTransferForPerson: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
    extra: new FormControl('', Validators.required),


  }, );
  

  myFormTransferUpdate = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    date_time_Depart: new FormControl('', Validators.required),
    date_time_Arrive: new FormControl( '', Validators.required),
    nbrePlacesOccupees: new FormControl('', Validators.required),
    priceTransferForPerson: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
    extra: new FormControl('', Validators.required),


  });





  constructor(private shareService : TransfersService, private router : Router, private agentLayoutService: AgentLayoutService, private authService : LoginService,
    private notifService : NotificationService)
  {

    this.shareService.getAll().subscribe(
      (data: any[]) => {
        this.transfers = data;
         const currentDate = new Date();
         this.transfers.forEach(transfer => {
          const arrival = new Date(transfer.date_time_Arrive); // Assurez-vous que la propriété date_time_Arrive existe dans votre objet de transfert
          if (arrival < currentDate && transfer.etatTransfer=='Available') {
            const updatedTransferData = { etatTransfer: 'Not Available' };
            this.shareService.updateTransfer(transfer.id, updatedTransferData).subscribe(
              () => {
                console.log('Transfer Updated!' +transfer.from +transfer.to);
                this.message = 'Transfer Updated!';
              },
              error => {
                console.error('Error updating transfer:', error);
                this.message = 'Error updating transfer';
              }
            );
          
          }})}
     
    );

 
  }



  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
    
    };
  
  this.loadVille();
   this.loadTransfers();
    
  
  }

// getToken():void{
// this.authService.getTokenData().subscribe(
//   (response) => {
//     this.idAgency= response.agency.id;
//     console.log(this.idAgency);
 
//   })}


loadTransfers(): void {
  this.authService.getTokenData().subscribe(
    (response) => {
      this.idAgency= response.agency.id;
      this.agencyId= response.agency.id;
      this.agencyName = response.agency.name;
      this.agencyLogo = response.agency.logo;
      this.agentEmetteurId = response.id;
   
   
   
  
  this.shareService.getTransferByAgency(this.idAgency).subscribe(
    (data: any[]) => {
      this.transfers = data.sort((a, b) => new Date(b.date_time_Depart).getDate() - new Date(a.date_time_Depart).getDate());
      this.dtTrigger.next(null);
    },
    (error) => {
      console.error('Erreur lors de la récupération des transfers :', error);
    }
  ); });
   
}


loadVille():void{
  this.shareService.getVille().subscribe(
    (data: any[]) => {
      this.villes = data; 
    
      
    },
    (error) => {
      console.error('Erreur lors de la récupération des villes :', error);
    }
  );
}
async onSubmit() {
  if (this.myFormTransfer.invalid) {
    this.emptymessage = true;
    console.log(this.emptymessage);
    return;
  }

  const transferData = this.myFormTransfer.value;
console.log(transferData)
  try {
    const response = await this.shareService.addTransfer(transferData);

    console.log('Transfer created:', response);
    this.message = "Transfer Created!";
    this.emptymessage = true;
    this.myFormTransfer.reset();
  } catch (error) {
    console.error('Error creating transfer:', error);
    this.message = "Transfer was not created!";
   
  }
  return this.loadTransfers();
}

deleteTransfer(id: string): void {
  const confirmation = window.confirm('You want to delete this Transfer ?');
  if (confirmation) {

    this.shareService.deleteTransfer(id).subscribe(() => {
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

UpdateTransfer(): void {
  if (this.myFormTransferUpdate.invalid) {
this.message='Formulaire Invalid !'
    return;
  }

  const updatedUpdateData = this.myFormTransferUpdate.value;

  this.shareService.updateTransfer(this.TransferId, updatedUpdateData).subscribe(
    () => {
     
      this.message='Transfer Updated!'

    },
    error => {
      console.error('Erreur lors de la mise à jour de transfer :', error);
      this.message='Transfer Does Not Updated !'
      console.log('erreur!');
    }
  );
 
 }

 openUpdateModal(id: string): void {
  this.TransferId = id;    //id bus récupéré depuis la table affichée
  console.log(this.TransferId);
  this.shareService.getById(this.TransferId).subscribe(data => {
    this.TransferData = data;
    this.myFormTransferUpdate.patchValue({
      from: this.TransferData.from,
      to: this.TransferData.to,
      date_time_Depart: this.TransferData.date_time_Depart,
      date_time_Arrive: this.TransferData.date_time_Arrive,
      nbrePlacesOccupees: this.TransferData.nbrePlacesOccupees,
      priceTransferForPerson: this.TransferData.priceTransferForPerson,
      note: this.TransferData.note,
      extra: this.TransferData.extra,


    });
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




Details(id: string): void {
  this.TransferId = id;    //id bus récupéré depuis la table affichée
  this.shareService.getById(this.TransferId).subscribe(data => {
    this.TransferData = data;
    this.from=data.from;
    this.to=data.to;
    this.arrive=data.date_time_Arrive;
    this.depart=data.date_time_Depart;
    this.nbplaces=data.nbrePlacesDisponibles;
    this.pricePlace=data.priceTransferForPerson;
    this.etat=data.etatTransfer;
    this.note=data.note;
    this.extra=data.extra;
    this.status=data.status;
    this.avatar=data.agent.picture;
    this.firstName=data.agent.firstname;
    this.lastName=data.agent.lastname;
    this.dateCreation=data.dateCreation;
    this.id = data.id;
    const currentDate = new Date();
    const arrival = new Date(this.arrive);
   if (arrival < currentDate)
    {this.isExpired==true;
      const updatedUpdateData ={etatTransfer:'Not Available'};

      this.shareService.updateTransfer(this.TransferId, updatedUpdateData).subscribe(
        () => {
         
          this.message='Transfer Updated!'
    
        },)
    //  this.etat='Not Available'
    
    }
   else{this.isExpired==false;
    this.etat=data.etatTransfer;
   }
    const modal = document.getElementById('ModalDetails');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }, error => {
    console.error('Error retrieving bus data:', error);
  });

}



// shareTransfer(id: string): void {
//   const confirmation = window.confirm('Vous voulez partager ce transfert ?');
//   if (confirmation) {
//     this.shareService.getById(id).subscribe(
//       (data: any) => {
//         this.transfer = data;
//         const shareTime = new Date().toISOString();
  
//            this.shareService.logo = data.agency.logo; 
//             this.shareService.agencyName = data.agency.logo; 
//             data.dateCreation = shareTime;
//             this.shareService.setTransferData(this.transfer); 
//             this.agentLayoutService.addTransfer(this.transfer); 
//             // Ajout du transfert partagé dans le localStorage
//             const sharedTransfersData = localStorage.getItem('sharedTransfers');
//             const sharedTransfers = sharedTransfersData ? JSON.parse(sharedTransfersData) : [];
//           //  this.transfer.shareTime = shareTime; 
//             sharedTransfers.push(this.transfer); 
       
//             localStorage.setItem('sharedTransfers', JSON.stringify(sharedTransfers));

//             this.router.navigate(['/agent-layout/profile']);
//           },
//           (error) => {
//             console.error('Erreur lors de la récupération du token de l\'agence :', error);
//           }
//         );
      
     
   
//   }
// }


shareTransfer(id: string): void {
  this.shareService.getById(id).subscribe(
    (data: any) => {
      this.transfer = data;
     if(data.isShared === true)
      {
        const isSharedAlready = window.confirm('This Transfer Is Already Shared !');
  if (isSharedAlready) {
    this.isShared=true;
      }
    } else 
    { const confirmation = window.confirm('Vous voulez partager ce transfert ?');
    if (confirmation) {
      this.shareService.getById(id).subscribe(
        (data: any) => {
          this.transfer = data;
          this.TransferId=data.id;
          const pdateTransfer = 
          {isShared :true,
            dateShare:new Date().toISOString()
          }
  
          this.shareService.updateTransfer(this.TransferId, pdateTransfer).subscribe(
            () => {
             
              this.message='Transfer Updated!'
        
            },)
          const shareTime = new Date().toISOString();

              this.router.navigate(['/agent-layout/profile']);
            },
            (error) => {
              console.error('Erreur lors de la récupération du token de l\'agence :', error);
            }
          ); }}});}
showReservationDetails : boolean=false;
dataTransfer:string='';
noReservation:boolean=false;
index:number=0;
showDetails(){

  this.showReservationDetails = !this.showReservationDetails;
  this.shareService.getNotifTransfert(this.idAgency, this.TransferId).subscribe(
    (data: any[]) => {
   
this.notifications =data;
this.noReservation=false;
if(data.length===0)
  {this.noReservation=true;}
    },

  
  );

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
    //    const notifUpdate = {
    //     nbrPassengers : 
    //   }
    // this.shareService.updateMission(this.TransferId,)  
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
    
     

      }
    







}







