import { Component, OnInit } from '@angular/core';
import {MissionsService} from './missions.service'
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { AvatarModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from 'src/app/pages/login/login.service';
import { BusesService } from '../buses/buses.service';
import { TransfersService } from '../transfers/transfers.service';
import { DriversService } from '../users/drivers/drivers.service';
import { DataTablesModule } from 'angular-datatables';
@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule, GridModule, FormModule, ReactiveFormsModule, RouterLink, DataTablesModule, AvatarModule],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.scss'
})
export class MissionsComponent implements OnInit {
  transfers:any[]=[];
  myFormMission = new FormGroup({
    name: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    date_time_start: new FormControl('', Validators.required),
    date_time_end: new FormControl('', Validators.required),
    nbrPassengers: new FormControl('', Validators.required),
    totalPrice: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    dateMission: new FormControl('', Validators.required),
    transfers: new FormControl([], Validators.required),
    busId: new FormControl('', Validators.required),
    driverId: new FormControl('', Validators.required,),
    etatMission: new FormControl('', Validators.required),

  });


  FormUpdateMission = new FormGroup({
    name: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    date_time_start: new FormControl('', Validators.required),
    date_time_end: new FormControl('', Validators.required),
    nbrPassengers: new FormControl('', Validators.required),
    totalPrice: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    dateMission: new FormControl('', Validators.required),
    transfers: new FormControl([], Validators.required),
    busId: new FormControl('', Validators.required),
    driverId: new FormControl('', Validators.required,),
    etatMission: new FormControl('', Validators.required),

  }); 
  drivers:any[]=[];
buses:any[]=[];
  missions:any[] = [];
  villes:any[]=[];
  message:string="";
  emptymessage:boolean=false;
  delete1:boolean=false;
  missionId="";
  missionData:any;
  isCreated:boolean=false;
  agencyId="";
  mission:any;
  transfersMission:any[]=[];
  name:string='';
  from:string='';
  to:string='';
  dateMission:string='';
  firstName:string='';
  lastName:string='';
  avatar:string='';
  dateCreation:string='';
  nbPlaces:number=0;
  price:number=0;
  transferUsed:any;
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
constructor(private missionService: MissionsService,  private router : Router, private transferService : TransfersService,
  private authService : LoginService, private busesService : BusesService, private driversService : DriversService
){


  this.missionService.getAll().subscribe(
    (data: any[]) => {
      this.missions = data;
       const currentDate = new Date();
       this.missions.forEach(mission => {
        const arrival = new Date(mission.date_time_start); // Assurez-vous que la propriété date_time_Arrive existe dans votre objet de transfert
        if (arrival < currentDate && mission.etatMission=='Available') {
          const updatedMissionData = { etatMission: 'Not Available' };
          this.missionService.updateMissions(mission.id, updatedMissionData).subscribe(
            () => {
              console.log('Mission Etat Updated!' +mission.from +mission.to);
             
            },
            error => {
              console.error('Error updating mission:', error);
            
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
   this.loadMission();
   this.loadTransfers();
   this.loadBuses();
   this.loaddrivers();


  
 
}

loadMission(): void {
  this.authService.getTokenData().subscribe(
    (response) => {
      this.agencyId= response.agency.id;
  
  this.missionService.getAllMissions(this.agencyId).subscribe(
    (data: any[]) => {
      this.missions = data.sort((a, b) => new Date(b.date_time_start).getTime() - new Date(a.date_time_start).getTime());

      this.dtTrigger.next(null);
      
    },
    (error) => {
      console.error('Erreur lors de la récupération des missions :', error);
    }
  );})
}


loadTransfers():void{
  this.authService.getTokenData().subscribe(
    (response) => {
      this.agencyId= response.agency.id;
  console.log('agencyId :'+this.agencyId)
  this.transferService.getTransferByAgency(this.agencyId).subscribe(
    (data: any[]) => {
      
      this.transfers =data.filter(transfer => transfer.etatTransfer === 'Not Available' &&  transfer.status === 'Actif');
     
    },
    (error) => {
      console.error('Erreur lors de la récupération des missions :', error);
    }
  );});

}


loadBuses(): void {
 
  this.authService.getTokenData().subscribe(
    (response) => {
      this.agencyId= response.agency.id;
  
  this.busesService.getBusByAgency(this.agencyId).subscribe(
    (data: any[]) => {
      this.buses = data; 
      this.buses.sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime());
  
      
    },
    (error) => {
      console.error('Erreur lors de la récupération des buses :', error);
    }
  ); });
}

loaddrivers(): void {
  this.authService.getTokenData().subscribe(
    (response) => {
      this.agencyId= response.agency.id;
   
   
  
  this.driversService.getDriversByAgency(this.agencyId).subscribe(
    (data: any[]) => {
     
      this.drivers = data;
  
      
    },
   
  ); })
}

    onSubmit() {
  if (this.myFormMission.invalid) {

    this.emptymessage = true;
    console.log(this.emptymessage);
    return;
  }


  const formData = this.myFormMission.value;
  try {
    const response = this.missionService.addMissions(formData);
    console.log('mission created:', response);
    this.message = "Misson created!";
    this.isCreated=true;
    this.transferUsed = formData.transfers;

    console.log('liste transfers' , this.transferUsed ); 
    for (const idTransfer of  this.transferUsed) {
      const updateTransfer = {status : 'Blocked'}
this.transferService.updateTransfer(idTransfer, updateTransfer).subscribe(
  () => { 
    console.log('Transfer mis à jour avec succès !', );
  },)
    }

    this.myFormMission.reset();
   
  } catch (error) {
    console.error('Error creating mission:', error);
    this.message = "Mission was not created!";
   
  }



}


loadVille():void{
  this.missionService.getVille().subscribe(
    (data: any[]) => {
      this.villes = data; 
      console.log(data);
      
    },
    (error) => {
      console.error('Erreur lors de la récupération des villes :', error);
    }
  );
}


updateMission(): void {
  if (this.FormUpdateMission.invalid) {
this.message='Formulaire Invalid !'
    return;
  }

  const updatedMissionData = this.FormUpdateMission.value;

  const response = this.missionService.updateMissions(this.missionId, updatedMissionData).subscribe(
    () => { 
      console.log('Mission mis à jour avec succès !',updatedMissionData );
      this.message='Mission Updated!'
    //  this.resetUrlAndReload();
    },
    error => {
      console.error('Erreur lors de la mise à jour de mission :', error);
      this.message='Mission Does Not Updated !'
     
    }
  );
 }







deleteMission(id: string): void {
  const confirmation = window.confirm('You want to delete this Mission ?');
  if (confirmation) {

    this.missionService.deleteMissions(id).subscribe(() => {
      this.message = "isDeleted";

      this.delete1=true;
      console.log(this.delete1, this.message);
      
     // this.router.navigate(['/'])
    // console.log(this.delete)
    //  this.loadUsers();
     
    
      },
      error => {
        console.error('Erreur lors de la suppression de Mission :', error);
      }
    );
  } else {
 
    console.log('Suppression annulée');
  }
}

openUpdate(id: string): void {
  this.missionId = id;    //id bus récupéré depuis la table affichée
  console.log(this.missionId);
  this.missionService.getById(this.missionId).subscribe(data => {
    this.missionData = data;
    this.FormUpdateMission.patchValue({
      name: this.missionData.name,
      from: this.missionData.from,
      to: this.missionData.to,
      date_time_start: this.missionData.date_time_start,
      date_time_end: this.missionData.date_time_end,
      nbrPassengers: this.missionData.nbrPassengers,
      totalPrice: this.missionData.totalPrice,
      status: this.missionData.status,
      dateMission: this.missionData.dateMission,
      transfers: this.missionData.transfers,
      driverId: this.missionData.drivers,
      busId : this.missionData.buses,
      etatMission: this.missionData.etatMission

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


details(id:string){
  this.missionService.getById(id).subscribe(data => {
this.mission=data;
console.log(this.mission.transfers);
this.transfersMission=this.mission.transfers;
this.name=this.mission.name;
this.from=this.mission.from;
this.to=this.mission.to;
this.dateMission=this.mission.dateMission;
this.firstName=this.mission.agent.firstname;
this.lastName=this.mission.agent.lastname;
this.dateCreation=this.mission.dateCreation;
this.avatar=this.mission.agent.picture;
this.nbPlaces=this.mission.nbrPassengers;
this.price=this.mission.totalPrice;
  })
}


shareMission(id:string): void{
  this.missionService.getById(id).subscribe(
    (data: any) => {
      this.mission = data;
     
    { const confirmation = window.confirm('Vous voulez partager cette Mission ?');
    if (confirmation) {
      this.missionService.getById(id).subscribe(
        (data: any) => {
          this.mission = data;
          this.missionId=data.id;
          const updateMission = 
          {isShared :true,
            dateShare:new Date().toISOString()
          }
  
          this.missionService.updateMissions(this.missionId, updateMission).subscribe(
            () => {
             
              this.message='Mission Updated!'
        
            },)
  
  
  
  
         
    
      
  
              this.router.navigate(['/agent-layout/profile']);
            },
            (error) => {
              console.error('Erreur lors de la récupération du token de l\'agence :', error);
            }
          );
        
       
     
    }}
      });
}


}

