import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@coreui/angular';
import { LoginService } from 'src/app/pages/login/login.service';
import { BookingsService } from './bookings.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, AvatarComponent,FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit, OnDestroy {

idAgency:string='';
  bookings:any[]=[];
  agencyEmettriceId:string='';
  agencyEmettrice:string='';
  agencyEmettriceLogo:string='';
  transferId:string='';
  transferPrice:number=0;
  getTransferId:string='';

constructor(private shareService : BookingsService, private loginService : LoginService){}



ngOnInit(): void {
this.loginService.getTokenData().subscribe(data=>{
  this.idAgency=data.agency.id;
  console.log(this.idAgency);
  this.shareService.getBooking(this.idAgency).subscribe(
    (data: any[]) => {
      this.bookings = data; 
      
      for (const booking of  this.bookings) {
        this.transferId=booking.transferId;
        console.log('id transfer',booking.transferId)
        this.shareService.getTransferById(this.transferId).subscribe(data=>{
this.transferPrice=data.priceTransferForPerson;
        });
      }
      console.log(this.bookings);
      console.log('test',this.getTransferId);
    },
    (error) => {
      console.error('Erreur lors de la récupération des bookings :', error);
    }
  );
})
//this.shareService.getAgencyById()
 // this.loadBooking();
}

loadBooking(): void {
  this.shareService.getBooking(this.idAgency).subscribe(
    (data: any[]) => {
      this.bookings = data; 

      
    },
    (error) => {
      console.error('Erreur lors de la récupération des bookings :', error);
    }
  );
}
getTransfer(id:string){
  console.log(id)
}


ngOnDestroy() {
  
}



}
