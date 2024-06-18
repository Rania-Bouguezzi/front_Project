import { Component } from '@angular/core';
import { AgentLayoutService } from '../../agent-layout.service';
import { DefaultHeaderService } from 'src/app/containers/default-layout/default-header/default-header.service';
import { Router } from '@angular/router';
import { AvatarModule, FormModule } from '@coreui/angular';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NeedsTransferService} from './needs-transfer.service';
import { LoginService } from 'src/app/pages/login/login.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-needs-transfer',
  standalone: true,
  imports: [AvatarModule, FormsModule, ReactiveFormsModule,CommonModule, NavbarComponent],
  templateUrl: './needs-transfer.component.html',
  styleUrl: './needs-transfer.component.scss'
})
export class NeedsTransferComponent {

  firstname : string ='';
  lastname : string ='';
  email : string ='';
  picture : string ='';
  transfer:any[]=[];
  logo: string='';
  agencyName:string='';
  emptymessage:boolean=false;
  message : string ='';
  idAgency:string='';
  transfers:any;
  searchTerm: string = '';
  TransferId:string='';
  TransferData:any;
  myFormTransfer = new FormGroup({
    text: new FormControl('', Validators.required),
  });
  myFormTransferUpdate = new FormGroup({
    text: new FormControl('', Validators.required),
  });


  myFormContact = new FormGroup({
    text: new FormControl('', Validators.required),
  });

constructor(private tokenService : LoginService, private tokenLogout:  DefaultHeaderService, private router:Router,
  private  shareService : NeedsTransferService, private authService : LoginService
){}


ngOnInit(): void {

  this.tokenService.getTokenData().subscribe(
    (tokenData) => {

      this.firstname = tokenData.firstname;
      this.lastname = tokenData.lastname;
      this.email = tokenData.email;
      this.picture = tokenData.picture;
      this.logo= tokenData.agency.logo;
      this.agencyName=tokenData.agency.name;
      this.idAgency=tokenData.agency.id;
  


    },
    (error) => {
      console.error('Erreur lors de la récupération des données du token:', error);
    }
  );
  this.loadTransfers();

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
    } catch (error) {
      console.error('Error creating transfer:', error);
      this.message = "Request will not be publish!";
     
    }
 
  }


  
loadTransfers(): void {
  this.authService.getTokenData().subscribe(
    (response) => {
      this.idAgency= response.agency.id;
     console.log(this.idAgency)
   
   
  
  this.shareService.getAll().subscribe(
    (data: any[]) => {
      this.transfers = data; 
      this.transfers = data.sort((a: any, b: any) => {
        return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
      });
     
      
    },
    (error) => {
      console.error('Erreur lors de la récupération des transfers :', error);
    }
  ); })
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
  this.TransferId = id;  
  console.log(this.TransferId);
  this.shareService.getById(this.TransferId).subscribe(data => {
    this.TransferData = data;
    this.myFormTransferUpdate.patchValue({
      text: this.TransferData.text,
      

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



  
  logout(){

 }




 filterTransfers(): void {
  if (!this.searchTerm || this.searchTerm.trim() == '') {
    this.loadTransfers(); 
    return;
  }

  this.transfers = this.transfers.filter((transfer: any) =>
    transfer.text && transfer.text.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

onSearch(event: any): void {
  this.searchTerm = event.target.value;
  this.filterTransfers();
}




deleteTransfer(id: string): void {
  const confirmation = window.confirm('You want to delete this Publication ?');
  if (confirmation) {

    this.shareService.delete(id).subscribe(() => {
      this.message = "isDeleted";
      },
      error => {
        console.error('Erreur lors de la suppression de Transfer :', error);
      }
    );
  } else {
 
    console.log('Suppression annulée');
  }
}

 

}
