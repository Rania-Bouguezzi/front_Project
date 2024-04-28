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


  constructor( private notifService : NotificationService, private tokenService : LoginService){}


  ngOnInit(): void {

  this.getNotif();
  this.tokenService.getTokenData().subscribe(
    (tokenData) => {
     // console.log('Données du token:', tokenData);
 this.agencyId = tokenData.agency.id;

  


    },);

  
  }

  getNotif() : void{
    this.notifService.getNotifByAgency(this.agencyId).subscribe(
      (data) => {
        this.notifs = data; 
      console.log(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifs :', error);
      }
    ); 
  }
  }




