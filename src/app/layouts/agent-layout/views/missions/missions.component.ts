import { Component, OnInit } from '@angular/core';
import {MissionsService} from './missions.service'
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { CardModule, FormModule, GridModule } from '@coreui/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule, GridModule, FormModule, ReactiveFormsModule, RouterLink],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.scss'
})
export class MissionsComponent implements OnInit {
  myFormMission = new FormGroup({
    name: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    date_time_start: new FormControl('', Validators.required),
    date_time_end: new FormControl('', Validators.required),
    nbrPassengers: new FormControl('', Validators.required),
    totalPrice: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    dateMission: new FormControl('', Validators.required)

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
    dateMission: new FormControl('', Validators.required)

  }); 

  missions:any[] = [];
  villes:any[]=[];
  message:string="";
  emptymessage:boolean=false;
  delete1:boolean=false;
  missionId="";
  missionData:any;
constructor(private missionService: MissionsService,  private route : ActivatedRoute){}


ngOnInit(): void {
  this.loadVille();
   this.loadMission();
  
 
}

loadMission(): void {
  this.missionService.getAllMissions().subscribe(
    (data: any[]) => {
      this.missions = data; 
      
    },
    (error) => {
      console.error('Erreur lors de la récupération des missions :', error);
    }
  );
}
onSubmit() {
  if (this.myFormMission.invalid) {

    this.emptymessage = true;
    console.log(this.emptymessage);
    return;
  }

  const name = this.myFormMission.value.name || '';
  const from = this.myFormMission.value.from || '';
  const to = this.myFormMission.value.to || '';
  const date_time_start = this.myFormMission.value.date_time_start || '';
  const date_time_end = this.myFormMission.value.date_time_end || '';
  const nbrPassengers = this.myFormMission.value.nbrPassengers || '';
  const totalPrice = this.myFormMission.value.totalPrice || '';
  const status = this.myFormMission.value.status || '';
  const dateMission = this.myFormMission.value.dateMission || '';
  const formData = JSON.stringify(this.myFormMission.value);

  this.missionService.addMissions(
  name,from,to,date_time_start, date_time_end,nbrPassengers,totalPrice,status,dateMission
  ).subscribe(
    () => {
      console.log('Mission created !');
      this.message = "Mission Created !";
      this.emptymessage = false;
   
      this.myFormMission.reset();


    },
    error => {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      this.message = "Bus Does not Created !";
      this.emptymessage = false;
    }
  );
  console.log(formData)
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

  this.missionService.updateMissions(this.missionId, updatedMissionData).subscribe(
    () => { 
      console.log('Mission mis à jour avec succès !');
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


}

