import { Component, OnInit } from '@angular/core';
import {AgencyDetailsService}  from '../../agency-details.service'
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AvatarModule, CardHeaderComponent } from '@coreui/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agent',
  standalone: true,
  imports: [CommonModule, DataTablesModule, AvatarModule, CardHeaderComponent],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.scss'
})
export class AgentComponent implements OnInit {
agents:any[]=[];
dtoptions: DataTables.Settings = {};
dtTrigger:Subject<any>=new Subject<any>();
idAgency:string='';
agencyName:string='';
agencyLogo:string='';
  constructor(private agencyService : AgencyDetailsService, private route : ActivatedRoute, private router : Router){}
  ngOnInit(): void {
    this.dtoptions = {pagingType: 'full_numbers'};
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.idAgency=id;
      this.getAgency(id);
      this.getAgent(id) });
    
     
  }
getAgency(id:string){
  this.agencyService.getAgencyById(id).subscribe((data)=>{
this.agencyName=data.name;
this.agencyLogo=data.logo;
  })
}

  getAgent(id : string){
this.agencyService.getAgentByAgency(id).subscribe(
  (data) => {
    this.agents = data;
    this.dtTrigger.next(null);
  })}

goBack(){
this.router.navigate([`admin/agencyDetails/${this.idAgency}`])
}



}
