import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AgencyDetailsService } from '../../agency-details.service';
import { AvatarComponent, CardHeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, DataTablesModule, CardHeaderComponent, AvatarComponent],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss'
})
export class TransferComponent {
  transfers:any[]=[];
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
        this.getTransfers(id);
      this.getAgency(id); });
       
    }
  
  
    getTransfers(id : string){
  this.agencyService.getTransferByAgency(id).subscribe(
    (data) => {
      this.transfers = data;
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
