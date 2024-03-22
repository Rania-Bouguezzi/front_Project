import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingsService } from './bookings.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent {


  bookings:any[]=[];
constructor(private shareService : BookingsService){}



ngOnInit(): void {
  this.loadBooking();
}

loadBooking(): void {
  this.shareService.getAll().subscribe(
    (data: any[]) => {
      this.bookings = data; 
      
    },
    (error) => {
      console.error('Erreur lors de la récupération des bookings :', error);
    }
  );
}








}
