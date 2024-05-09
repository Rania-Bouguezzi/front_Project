import { Component, OnInit } from '@angular/core';
import {MissionsService} from './missions.service'
import { CommonModule } from '@angular/common';
import {  AvatarModule, FormModule, GridModule } from '@coreui/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TransfersService } from '../transfers/transfers.service';
import { LoginService } from 'src/app/pages/login/login.service';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BusesService } from '../buses/buses.service';
import { DriversService } from '../users/drivers/drivers.service';

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
    buses: new FormControl([], Validators.required),
    drivers: new FormControl([], Validators.required,)

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
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
constructor(private missionService: MissionsService,  private route : ActivatedRoute, private transferService : TransfersService,
  private authService : LoginService, private busesService : BusesService, private driversService : DriversService
){}


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
      this.missions = data.sort((a: any, b: any) => {
        return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
      });

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
      
      this.transfers =data.filter(transfer => transfer.etatTransfer === 'Available');
      
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
    this.myFormMission.reset();
  } catch (error) {
    console.error('Error creating mission:', error);
    this.message = "Mission was not created!";
   
  }}


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

}

