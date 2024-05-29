import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarModule, CardHeaderComponent } from '@coreui/angular';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AgencyDetailsService } from '../../agency-details.service';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule, DataTablesModule, AvatarModule, CardHeaderComponent],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.scss'
})
export class DriverComponent {
  drivers:any[]=[];
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
        this.getDriver(id);
      this.getAgency(id); });
       
    }
  
  
    getDriver(id : string){
  this.agencyService.getDriverByAgency(id).subscribe(
    (data) => {
      this.drivers = data;
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
