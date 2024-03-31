import { Component } from '@angular/core';
import { DriversService } from './drivers.service';
import { CommonModule } from '@angular/common';
import { AvatarModule } from '@coreui/angular';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent {
  drivers:any[]=[];
  message:string="";
  delete1:boolean=false;
  constructor(private shareService : DriversService){}
  
  
  
  ngOnInit(): void {
    this.loaddrivers();
  }
  
  loaddrivers(): void {
    this.shareService.getAll().subscribe(
      (data: any[]) => {
        this.drivers = data; // Stocke les buses récupérés dans une variable locale
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients :', error);
      }
    );
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
