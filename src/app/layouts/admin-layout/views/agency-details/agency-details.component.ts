import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  AvatarComponent, CardHeaderComponent } from '@coreui/angular';
import { AgencyService } from '../agency/agency.service';

@Component({
  selector: 'app-agency-details',
  standalone: true,
  imports: [CommonModule, CardHeaderComponent, AvatarComponent],
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

constructor(private route: ActivatedRoute, private agencyService : AgencyService, private router : Router){}


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
   this.address= data.address;
   this.agencyLogo = data.logo;
   this.email = data.email;
   this.phone = data.phone;
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

}
