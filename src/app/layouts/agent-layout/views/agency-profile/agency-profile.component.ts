import { Component, OnInit } from '@angular/core';
import {AgencyProfileService} from './agency-profile.service'
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AvatarModule } from '@coreui/angular';
import { AgentLayoutService } from '../../agent-layout.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-agency-profile',
  standalone: true,
  imports: [CommonModule, AvatarModule, ReactiveFormsModule, NavbarComponent ],
  templateUrl: './agency-profile.component.html',
  styleUrl: './agency-profile.component.scss'
})
export class AgencyProfileComponent  implements OnInit {
  agency : any;
name : string ='';
logo : string ='';
email : string ='';
website : string ='';
phone : string ='';
address : string ='';
missions : any[]=[];
missionLength:number=0;
commentLength:any;
needTransfer: any[]=[];
needLength:number=0;
myFormComment = new FormGroup({
  text: new FormControl('', Validators.required),});

constructor(private agencyService : AgencyProfileService, private route : ActivatedRoute, private agentService : AgentLayoutService){}


ngOnInit(): void {

  this.route.params.subscribe(params => {
    const id = params['id']; 
    console.log('ID récupéré dans AgencyProfileComponent:', id);
    this.getAgencyDetails(id);
    this.getMissionByAgency(id);

  this.agencyService.countFeedbacks(id).subscribe(data => {
    this.commentLength = data;
  });
  this.agencyService.getNeedTransferByAgency(id).subscribe(data => {
    this.needTransfer = data;
    this.needLength= data.length
  });
  });


}

getAgencyDetails(id : string){
this.agencyService.getAgencyById(id).subscribe(data => {
  this.agency = data;
 this.name = data.name;
 this.email = data.emailAgency;
 this.website = data.website;
 this.address = data.addressAgency;
 this.logo =data.logo;
 this.phone= data.phoneAgency;
})
}


getMissionByAgency(id:string){
  this.agencyService.getMissionByAgency(id).subscribe(data => {
    this.missions =data;
    this.missionLength = data.length;
  })
}



showComments:boolean=false;
selectedMissionId:string='';

showDivComment(id:string){
  this.selectedMissionId = id;
  this.showComments = true;
  return this.getFeedbacks(id);

}


async comment (idMission : string){
  if (this.myFormComment.invalid) {
    return;
  }

  const commentData = this.myFormComment.value;
console.log(idMission)
console.log(commentData);
  try {
    const response = await this.agentService.addComment(commentData, idMission);

    console.log('comment created:', response);
    this.myFormComment.reset();
  } catch (error) {
    console.error('Error creating comment:', error);

   
  }
  return this.getFeedbacks(idMission);
}

feedbacks : any[]=[];
idMission:string = '';
currentDateComment: Date = new Date();
commentDate : string ='';
getFeedbacks(idMission : string){  
  this.agentService.getFeedbackByMission(idMission).subscribe(
    (data: any[]) => {
      this.feedbacks = data.sort((a: any, b: any) => {
        return new Date(b.dateShare).getTime() - new Date(a.dateShare).getTime();
      });
     
    },
    (error) => {
      console.error('Erreur lors de la récupération des feedbacks :', error);
    }
  ); }




  showRecent: boolean = true;
  showNeeds: boolean = false;

  showRecentPublication(): void {
    this.showRecent = true;
    this.showNeeds = false;
  }

  showNeedsPublication(): void {
    this.showRecent = false;
    this.showNeeds = true;
  }

}
