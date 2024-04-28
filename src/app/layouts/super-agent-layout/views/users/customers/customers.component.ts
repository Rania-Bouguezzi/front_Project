import { Component } from '@angular/core';
import { CustomersService } from './customers.service';
import { CommonModule } from '@angular/common';
import { AvatarModule } from '@coreui/angular';
import { LoginService } from 'src/app/pages/login/login.service';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, AvatarModule,DataTablesModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  customers:any[]=[];
  message:string="";
  delete1:boolean=false;
  idAgency:string="";
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  constructor(private shareService : CustomersService, private authService :LoginService){}
  
  
  
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
    
    };
    this.loadcustomers();
  }
  
  loadcustomers(): void {
    this.authService.getTokenData().subscribe(
      (response) => {
        this.idAgency= response.agency.id;
       console.log(this.idAgency)
     
     
    
    this.shareService.getCustomersByAgency(this.idAgency).subscribe(
      (data: any[]) => {
        if (data.length === 0) {
          this.message = "Any Customer !";
        } else {
        this.customers = data;
        this.dtTrigger.next(null);
        }
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des transfers :', error);
      }
    ); })
  }
  deleteCustomer(id: string): void {
    const confirmation = window.confirm('You want to delete this Customer ?');
    if (confirmation) {
  
      this.shareService.deleteCustomer(id).subscribe(() => {
        this.message = "isDeleted";
  
        this.delete1=true;
        console.log(this.delete1, this.message);
        
       // this.router.navigate(['/'])
      // console.log(this.delete)
      //  this.loadUsers();
       
      
        },
        error => {
          console.error('Erreur lors de la suppression de Client :', error);
        }
      );
    } else {
   
      console.log('Suppression annulée');
    }
  }
}
