import { Component, OnInit } from '@angular/core';
import { AvatarComponent } from '@coreui/angular';
import { LoginService } from 'src/app/pages/login/login.service';
import {DriverLayoutService} from './driver-layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver-layout',
  standalone: true,
  imports: [AvatarComponent, CommonModule],
  templateUrl: './driver-layout.component.html',
  styleUrl: './driver-layout.component.scss'
})
export class DriverLayoutComponent implements OnInit {
firstname:string='';
lastname:string='';
picture:string='';
email:string='';
missions : any[]=[];
idDriver : string='';
idAgency:string='';
agencyName:string='';
logo:string='';
emailAgency:string='';
phoneAgency:string='';
adressAgency:string='';



constructor(private tokenService : LoginService, private driverService : DriverLayoutService){}

ngOnInit(): void {
  this.tokenService.getTokenData().subscribe(
    (response) => {
      this.firstname= response.firstname;
      this.lastname= response.lastname;
      this.picture= response.picture;
      this.email= response.email;
      this.agencyName=response.agency.name;
      this.logo=response.agency.logo;
      this.emailAgency=response.agency.emailAgency;
      this.phoneAgency=response.agency.phoneAgency;
      this.adressAgency=response.agency.addressAgency;
      this.idAgency = response.agency.id;
      this.idDriver = response.id;
      this.getMission(this.idAgency, this.idDriver);
  })
 
}

logout(){
  this.tokenService.logout();
}

getMission(idAgency:string, idDriver:string){
  this.driverService.getMissionByDriver(idAgency,idDriver).subscribe((data)=>
  {
this.missions= data;
console.log(this.missions);
  })
}



selectedMissionId:string='';
showComments:boolean=false;
showDivComment(id:string){
  this.selectedMissionId = id;
  this.showComments = true;
  return this.getFeedbacks(id);

}

feedbacks : any[]=[];
idMission:string = '';
currentDateComment: Date = new Date();
commentDate : string ='';
message:boolean=false;
getFeedbacks(idMission : string){  
  this.driverService.getFeedbackByMission(idMission).subscribe(
    (data: any[]) => {
      if (data.length==0){
        this.message=true;
      } else{
        this.message=false;
      this.feedbacks = data.sort((a: any, b: any) => {
        return new Date(b.dateShare).getTime() - new Date(a.dateShare).getTime();
      });
     
    }},
    (error) => {
      console.error('Erreur lors de la récupération des feedbacks :', error);
    }
  ); }






}
