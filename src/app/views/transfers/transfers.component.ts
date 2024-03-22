import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransfersService } from './transfers.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule, FormModule, GridModule } from '@coreui/angular';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [CommonModule, FormModule,CardModule, GridModule,ReactiveFormsModule ],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.scss'
})
export class TransfersComponent implements OnInit {


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




  emptymessage:boolean=false;
  message:string="";
  transfers:any[]=[];
  villes:any[]=[];
  delete1:boolean=false;
  TransferId:string="";
  TransferData:any;
constructor(private shareService : TransfersService){}



ngOnInit(): void {
this.loadVille();
  this.loadTransfers();
}

loadTransfers(): void {
  this.shareService.getAll().subscribe(
    (data: any[]) => {
      this.transfers = data; // Stocke les buses récupérés dans une variable locale
      
    },
    (error) => {
      console.error('Erreur lors de la récupération des transfers :', error);
    }
  );
}


loadVille():void{
  this.shareService.getVille().subscribe(
    (data: any[]) => {
      this.villes = data; 
      console.log(data);
      
    },
    (error) => {
      console.error('Erreur lors de la récupération des villes :', error);
    }
  );
}

onSubmit() {
  if (this.myFormTransfer.invalid) {

    this.emptymessage = true;
    console.log(this.emptymessage);
    return;
  }
  const from = this.myFormTransfer.value.from || '';
  const to = this.myFormTransfer.value.to || '';
  const date_time_Depart = this.myFormTransfer.value.date_time_Depart || '';
  const date_time_Arrive = this.myFormTransfer.value.date_time_Arrive || '';
  const nbrePlacesDisponibles = this.myFormTransfer.value.nbrePlacesDisponibles || '';
  const priceTransferForPerson = this.myFormTransfer.value.priceTransferForPerson || '';
  const etatTransfer = this.myFormTransfer.value.etatTransfer || '';
  const note = this.myFormTransfer.value.note || '';
  const extra = this.myFormTransfer.value.extra || '';
  const status = this.myFormTransfer.value.status || '';
  const formData = JSON.stringify(this.myFormTransfer.value);

  this.shareService.addTransfer(
  from,to,date_time_Depart, date_time_Arrive,nbrePlacesDisponibles,priceTransferForPerson,etatTransfer,note,extra,status
  ).subscribe(
    () => {
      console.log('Tranfer created !');
      this.message = "Tranfer Created !";
      this.emptymessage = false;
   
      this.myFormTransfer.reset();


    },
    error => {
      console.error('Erreur lors de l\'ajout du Transfer :', error);
      this.message = "Transfer Does not Created !";
      this.emptymessage = false;
    }
  );
  console.log(formData)
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
      console.log('bus mis à jour avec succès !');
      this.message='Transfer Updated!'

    },
    error => {
      console.error('Erreur lors de la mise à jour de transfer :', error);
      this.message='Transfer Does Not Updated !'
     
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



