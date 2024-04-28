import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransfersService } from './transfers.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule, FormModule, GridModule } from '@coreui/angular';
import { Router } from '@angular/router';
import { SuperAgentLayoutService } from '../../super-agent-layout.service';
import { LoginService } from 'src/app/pages/login/login.service';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [CommonModule, FormModule,CardModule, GridModule,ReactiveFormsModule,DataTablesModule ],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.scss'
})
export class TransfersComponent implements OnInit {

   transfer:any[]=[];
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

  myFormTransfer = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    date_time_Depart: new FormControl('', Validators.required),
    date_time_Arrive: new FormControl('', Validators.required),
    nbrePlacesDisponibles: new FormControl('', Validators.required),
    priceTransferForPerson: new FormControl('', Validators.required),
    etatTransfer: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
    extra: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)

  });

  myFormTransferUpdate = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    date_time_Depart: new FormControl('', Validators.required),
    date_time_Arrive: new FormControl('', Validators.required),
    nbrePlacesDisponibles: new FormControl('', Validators.required),
    priceTransferForPerson: new FormControl('', Validators.required),
    etatTransfer: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
    extra: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)

  });






  constructor(private shareService : TransfersService, private router : Router, private agentLayoutService: SuperAgentLayoutService, private authService : LoginService){

    this.shareService.getAll().subscribe(
      (data: any[]) => {
        this.transfers = data;
         console.log(data);
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des transfers :', error);
      }
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
     console.log(this.idAgency)
   
   
  
  this.shareService.getTransferByAgency(this.idAgency).subscribe(
    (data: any[]) => {
      this.transfers = data; 
      this.dtTrigger.next(null);
    },
    (error) => {
      console.error('Erreur lors de la récupération des transfers :', error);
    }
  ); })
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
      nbrePlacesDisponibles: this.TransferData.nbrePlacesDisponibles,
      priceTransferForPerson: this.TransferData.priceTransferForPerson,
      etatTransfer: this.TransferData.etatTransfer,
      note: this.TransferData.note,
      extra: this.TransferData.extra,
      status: this.TransferData.status,

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






