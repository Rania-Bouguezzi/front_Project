import { Component, inject } from '@angular/core';

import { navItems } from './_nav';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/pages/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
   //authService = inject(LoginService);
   logo :string ="";
   name :string ="";
   email :string ="";

  currentUrl : string = ''
  public navItems = navItems;

  //récupéer l'url courant
  constructor( private  router : Router, private authService : LoginService ) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
 
      }
    });
  }
ngOnInit(): void {
  this.authService.getTokenData().subscribe(
    (response) => {
      this.logo= response.agency.logo;
      this.name= response.agency.name;
      this.email= response.agency.email;
    })

}


}