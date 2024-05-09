import { Component } from '@angular/core';
import { AgentLayoutService } from '../../agent-layout.service';
import { AvatarModule, PopoverModule, Triggers } from '@coreui/angular';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification/notification.service';
import { LoginService } from 'src/app/pages/login/login.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AvatarModule, CommonModule, PopoverModule],
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
  notifs :any[]=[];
  dateCreation:string='';
  public isPopoverOpen: boolean = false;

  constructor( private tokenService : LoginService ,private  router : Router, private notifService : NotificationService) { 
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

    


      },)
    
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
          this.notifs = this.notifs.sort((a: any, b: any) => {
            return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
          });     
          this.count = data.length;
          console.log(this.count)
         
        },
        (error) => {
          console.error('Erreur lors de la récupération des notifications :', error);
        }
      ); })
    }


    closePopover() {
      this.isPopoverOpen = false;
    }
}
