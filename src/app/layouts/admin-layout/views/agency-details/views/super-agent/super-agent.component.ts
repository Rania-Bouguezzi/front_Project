import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyDetailsService } from '../../agency-details.service';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AvatarModule, CardHeaderComponent } from '@coreui/angular';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-super-agent',
  standalone: true,
  imports: [CommonModule, DataTablesModule, AvatarModule, CardHeaderComponent],
  templateUrl: './super-agent.component.html',
  styleUrl: './super-agent.component.scss'
})
export class SuperAgentComponent implements OnInit {

spagent:any[]=[];
idAgency:string='';
dtoptions: DataTables.Settings = {};
dtTrigger:Subject<any>=new Subject<any>();
agencyName:string='';
agencyLogo:string='';

  constructor(private agencyService : AgencyDetailsService, private route : ActivatedRoute, private router : Router){}
  ngOnInit(): void {
    this.dtoptions = {pagingType: 'full_numbers'};
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.idAgency=id;
      this.getSpa(id);
    this.getAgency(id); });
  }



  getSpa(id:string){
this.agencyService.getSpaByAgency(id).subscribe((data)=>
{this.spagent=data;
  this.dtTrigger.next(null);
}
);}

goBack(){
  this.router.navigate([`admin/agencyDetails/${this.idAgency}`])
}

getAgency(id:string){
  this.agencyService.getAgencyById(id).subscribe((data)=>{
this.agencyName=data.name;
this.agencyLogo=data.logo;
  })
}

  }


