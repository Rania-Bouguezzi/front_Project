import { Component } from '@angular/core';
import { AgentLayoutService } from '../../agent-layout.service';
import { AvatarModule } from '@coreui/angular';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AvatarModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  logo:string='';
  agencyName:string='';
  email:string='';
  phone:string='';
  currentUrl:string='';
  count:number=0;
  agencyId:string='';


  constructor( private tokenService : AgentLayoutService ,private  router : Router, private notifService : NotificationService) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
 
      }
    });
  }

  ngOnInit(): void {

  this.tokenService.getTokenData().subscribe(
      (tokenData) => {
       // console.log('Données du token:', tokenData);
     
        this.logo= tokenData.agency.logo;
        this.agencyName=tokenData.agency.name;
        this.email= tokenData.agency.email;
        this.phone= tokenData.agency.phone;
        this.agencyId= tokenData.agency.id;
        this.notifService.getNotifByAgency(this.agencyId).subscribe(
          (data: any[]) => {
            this.count = data.length;
           
          },
          (error) => {
            console.error('Erreur lors de la récupération des notifications :', error);
          }
        ); 

    


      },)}

}
