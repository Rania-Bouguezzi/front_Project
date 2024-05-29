import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AgencyDetailsService } from '../../agency-details.service';
import { AvatarComponent, CardHeaderComponent, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-bus',
  standalone: true,
  imports: [CommonModule, DataTablesModule, AvatarComponent, CardHeaderComponent],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.scss'
})
export class BusComponent {
  agencyName:string='';
  buses:any[]=[];
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  idAgency:string='';
agencyLogo:string='';
    constructor(private agencyService : AgencyDetailsService, private route : ActivatedRoute, private router : Router){}
    ngOnInit(): void {
      this.dtoptions = {pagingType: 'full_numbers'};
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.idAgency=id;
        this.getBuses(id);
      this.getAgency(id);
      });
       
    }
  
  
    getBuses(id : string){
  this.agencyService.getBusByAgency(id).subscribe(
    (data) => {
      this.buses = data;
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
}
