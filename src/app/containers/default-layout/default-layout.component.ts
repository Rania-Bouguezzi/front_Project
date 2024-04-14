import { Component, inject } from '@angular/core';

import { navItems } from './_nav';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardService } from 'src/app/layouts/agent-layout/views/dashboard/dashboard.service';
import { LoginService } from 'src/app/pages/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
   authService = inject(LoginService);
   logo :string ="";
  currentUrl : string = ''
  public navItems = navItems;

  //récupéer l'url courant
  constructor( private  router : Router) { 
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
    })

}


}