import { Component } from '@angular/core';
import { PaymentService } from './payment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  payments:any[]=[];
constructor(private shareService : PaymentService){}



ngOnInit(): void {
  this.loadPayment();
}

loadPayment(): void {
  this.shareService.getAll().subscribe(
    (data: any[]) => {
      this.payments = data; 
      
    },
    (error) => {
      console.error('Erreur lors de la récupération des payments :', error);
    }
  );
} }
