import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  AvatarComponent, CardHeaderComponent } from '@coreui/angular';
import { AgencyService } from '../agency/agency.service';
import { AgencyDetailsService } from './agency-details.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-agency-details',
  standalone: true,
  imports: [CommonModule, CardHeaderComponent, AvatarComponent, ReactiveFormsModule],
  templateUrl: './agency-details.component.html',
  styleUrl: './agency-details.component.scss'
})



export class AgencyDetailsComponent implements OnInit {

agencyName:string='';
agencyLogo:string='';
website:string='';
phone:string='';
email:string='';
address:string='';
agency:any;
agencyData:any;
constructor(private route: ActivatedRoute, private agencyService : AgencyService, private router : Router, 
  private agencyDetailsService : AgencyDetailsService
){}

myFormAgency= new FormGroup({
  name: new FormControl('', Validators.required),
  logo: new FormControl('', Validators.required),
  emailAgency: new FormControl('', [Validators.required, Validators.email]),
  website: new FormControl('', Validators.required),
  phoneAgency: new FormControl('', Validators.required),
  addressAgency: new FormControl('', Validators.required),


});

idAgency:string='';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      this.getAgency(id);
this.idAgency = id;
    });
  }

getAgency(id:string){
  this.agencyService.getAgencyById(id).subscribe(
    (data) => {
   this.agency = data;
   this.agencyName = data.name;
   this.address= data.addressAgency;
   this.agencyLogo = data.logo;
   this.email = data.emailAgency;
   this.phone = data.phoneAgency;
   this.website=data.website;


});
}

goAgent(){
this.router.navigate([`admin/agent/${this.idAgency}`]);

}

goSuperAgent(){
  this.router.navigate([`admin/super-agent/${this.idAgency}`]); 
}
goDriver(){
  this.router.navigate([`admin/driver/${this.idAgency}`]); 
}
goBus(){
  this.router.navigate([`admin/bus/${this.idAgency}`]); 
}
goMission(){
  this.router.navigate([`admin/mission/${this.idAgency}`]); 
}
goTransfer(){
  this.router.navigate([`admin/transfer/${this.idAgency}`]); 
}

goBack(){
  this.router.navigate(['admin/agency'])
}

deleteAgency(id:string){
  const confirmation = window.confirm('You want to delete this Agency ?');
  if (confirmation) {
  const agencyUpdate ={status:'Blocked'};

 this.agencyDetailsService.deleteAgency(id, agencyUpdate).subscribe(() => {
         console.log('updated!');
        return this.router.navigate(['admin/agency']);
        })}
         else {
 
          console.log('Suppression annulée');
        }
        }


        updateAgency(): void {
          if (this.myFormAgency.invalid) {
       
            return;
          }
        
          const updatedAgencyData = this.myFormAgency.value;
        
          this.agencyDetailsService.updateAgency(this.idAgency, updatedAgencyData).subscribe(
            () => {
              console.log('agency mis à jour avec succès !');
         
            },
            error => {
              console.error('Erreur lors de la mise à jour de l agence', error);
          
             
            }
          );
         }     //café crème


         openUpdateModal(id: string): void {
          this.idAgency = id;   
          this.agencyDetailsService.getById(this.idAgency).subscribe(data => {
            this.agencyData = data;
            this.myFormAgency.patchValue({
              name: this.agencyData.name,
              emailAgency: this.agencyData.emailAgency,
      //   logo: this.agencyData.logo
              addressAgency: this.agencyData.addressAgency,
              phoneAgency: this.agencyData.phoneAgency,
              website: this.agencyData.website
            });
            
            // Open the update modal here
            const modal = document.getElementById('exampleModal');
            if (modal) {
              modal.classList.add('show');
              modal.style.display = 'block';
            }
          }, error => {
            console.error('Error retrieving agency data:', error);
          });
         
        }
         
}