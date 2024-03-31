import { Component } from '@angular/core';
import { CustomersService } from './customers.service';
import { CommonModule } from '@angular/common';
import { AvatarModule } from '@coreui/angular';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  customers:any[]=[];
  message:string="";
  delete1:boolean=false;
  constructor(private shareService : CustomersService){}
  
  
  
  ngOnInit(): void {
    this.loadcustomers();
  }
  
  loadcustomers(): void {
    this.shareService.getAll().subscribe(
      (data: any[]) => {
        this.customers = data; // Stocke les buses récupérés dans une variable locale
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients :', error);
      }
    );
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
