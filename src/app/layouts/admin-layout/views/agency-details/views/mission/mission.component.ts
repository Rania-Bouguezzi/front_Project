import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AgencyDetailsService } from '../../agency-details.service';
import { AvatarComponent } from '@coreui/angular';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [CommonModule, DataTablesModule, AvatarComponent],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss'
})
export class MissionComponent {
  missions:any[]=[];
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  idAgency:string='';
  agencyName:string='';
agencyLogo:string='';
transfers:any[]=[];
    constructor(private agencyService : AgencyDetailsService, private route : ActivatedRoute, private router : Router){}
    ngOnInit(): void {
      this.dtoptions = {pagingType: 'full_numbers'};
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.idAgency=id;
        this.getMission(id);
      this.getAgency(id); });
       
    }
  
  
    getMission(id : string){
  this.agencyService.getMissionrByAgency(id).subscribe(
    (data) => {
      this.missions = data;
     // this.transfers= data.transfers;
     
      this.dtTrigger.next(null);
    })}
  
  goBack(){
  this.router.navigate([`admin/agencyDetails/${this.idAgency}`])
  }

  getAgency(id:string){
    this.agencyService.getAgencyById(id).subscribe((data)=>{
  this.agencyName=data.name;
  this.agencyLogo=data.logo;
    })
  }
missionId:string='';
mission:any;
  getTransfer(id:string){
this.missionId=id;
this.agencyService.getMissionById(id).subscribe(
  (data) => {
    this.mission = data;
   // this.transfers= data.transfers;
   
    this.dtTrigger.next(null);
  })
  }
}
