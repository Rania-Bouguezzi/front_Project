import { Component } from '@angular/core';
import { DriversService } from './drivers.service';
import { CommonModule } from '@angular/common';
import { AvatarModule } from '@coreui/angular';
import { LoginService } from 'src/app/pages/login/login.service';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, AvatarModule,DataTablesModule],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent {
  drivers:any[]=[];
  message:string="";
  delete1:boolean=false;
  idAgency:string="";
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  constructor(private shareService : DriversService, private authService: LoginService){}
  
  
  
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
    
    };
    this.loaddrivers();
  }
  
  loaddrivers(): void {
    this.authService.getTokenData().subscribe(
      (response) => {
        this.idAgency= response.agency.id;
       console.log(this.idAgency)
     
     
    
    this.shareService.getDriversByAgency(this.idAgency).subscribe(
      (data: any[]) => {
        if (data.length === 0) {
          this.message = "Any Driver !";
        } else {
        this.drivers = data;
        this.dtTrigger.next(null);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des transfers :', error);
      }
    ); })
  }
  deleteDriver(id: string): void {
    const confirmation = window.confirm('You want to delete this Driver ?');
    if (confirmation) {
  
      this.shareService.deleteDriver(id).subscribe(() => {
        this.message = "isDeleted";
  
        this.delete1=true;
        console.log(this.delete1, this.message);
        
       // this.router.navigate(['/'])
      // console.log(this.delete)
      //  this.loadUsers();
       
      
        },
        error => {
          console.error('Erreur lors de la suppression de Driver :', error);
        }
      );
    } else {
   
      console.log('Suppression annulée');
    }
  }
}
