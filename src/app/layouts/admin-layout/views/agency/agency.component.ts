import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {AgencyService} from './agency.service'
import { AvatarComponent } from '@coreui/angular';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agency',
  standalone: true,
  imports: [CommonModule, AvatarComponent,DataTablesModule, FormsModule],
  templateUrl: './agency.component.html',
  styleUrl: './agency.component.scss'
})
export class AgencyComponent implements OnInit {
  agencies :any[]=[];
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  searchTerm:string='';

  constructor(private agencyService : AgencyService, private router : Router){}
ngOnInit(): void {

  this.dtoptions = {
    pagingType: 'full_numbers',
  
  };
  this.getAgencies();
  
}

getAgencies() : void {
  this.agencyService.getAgency().subscribe(
    (data) => {
   this.agencies = data;
   this.dtTrigger.next(null);
});

}

filterAgency(): void {
  if (!this.searchTerm || this.searchTerm.trim() == '') {
    this.getAgencies(); 
    return;
  }

  this.agencies = this.agencies.filter((agency: any) =>
    agency.name &&  agency.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

onSearch(event: any): void {
  this.searchTerm = event.target.value;
  this.filterAgency();
}


Details(id: string) {
  this.router.navigate([`admin/agencyDetails/${id}`]);
}


go(){
  this.router.navigate(['admin/agency/add']);
}
}