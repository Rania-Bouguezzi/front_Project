import { Component } from '@angular/core';
import { NotificationService } from './notification.service';
import { CommonModule } from '@angular/common';
import { AvatarModule } from '@coreui/angular';
import { LoginService } from 'src/app/pages/login/login.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  notifs :any[]=[];
agencyId:string='';
count:number=0;


  constructor( private notifService : NotificationService, private tokenService : LoginService){}


  ngOnInit(): void {

  this.getNotif();


  
  }

  getNotif() : void{
    this.tokenService.getTokenData().subscribe(
      (response) => {
        this.agencyId= response.agency.id;
       console.log(this.agencyId)
     
     
    
    this.notifService.getNotifByAgency(this.agencyId).subscribe(
      (data: any[]) => {
        this.notifs = data; 
        this.count = data.length;
        console.log(this.count)
       
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications :', error);
      }
    ); })
  }
  }




