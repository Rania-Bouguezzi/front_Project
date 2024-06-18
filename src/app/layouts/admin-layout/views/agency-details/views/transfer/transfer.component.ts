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
    
    TransferId:string='';

    ngOnInit(): void {
      this.dtoptions = {pagingType: 'full_numbers'};
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.idAgency=id;
        this.getTransfers(id);
      this.getAgency(id); });
       
    }
    getTransfer(id:string){
      this.TransferId=id;
      this.agencyService.getNotifTransfert(this.idAgency,  this.TransferId).subscribe(
        (data: any[]) => {     
    this.notifications =data;
    this.noReservation=false;
    console.log(this.notifications)
    if(data.length===0)
      {this.noReservation=true;
       
      }
        },
    
      
      );
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

notifications:any[]=[];
noReservation:boolean=false;
  showReservationTransfer(){
    console.log(this.TransferId)
    this.agencyService.getNotifTransfert(this.idAgency,  this.TransferId).subscribe(
      (data: any[]) => {
     
  this.notifications =data;
  this.noReservation=false;
  console.log(this.notifications)
  if(data.length===0)
    {this.noReservation=true;}
      },
  
    
    );
  
  }


}
