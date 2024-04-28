import { Component } from '@angular/core';
import { AgentLayoutService } from '../../agent-layout.service';
import { AvatarModule } from '@coreui/angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  logo:string='';
  agencyName:string='';
  email:string='';
  phone:string='';

  constructor (private tokenService : AgentLayoutService){}

  ngOnInit(): void {

  this.tokenService.getTokenData().subscribe(
      (tokenData) => {
       // console.log('Données du token:', tokenData);
     
        this.logo= tokenData.agency.logo;
        this.agencyName=tokenData.agency.name;
        this.email= tokenData.agency.email;
        this.phone= tokenData.agency.phone;

    


      },)}

}
