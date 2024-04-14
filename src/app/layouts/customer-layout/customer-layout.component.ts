import { Component } from '@angular/core';
import {CustomerLayoutService} from './customer-layout.service'
import { AvatarModule } from '@coreui/angular';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.scss'
})
export class CustomerLayoutComponent {

firstname : string ='';
lastname : string ='';
email : string ='';
picture : string ='';

  constructor (private tokenService : CustomerLayoutService){
 }

 ngOnInit(): void {
  this.tokenService.getTokenData().subscribe(
    (tokenData) => {
      console.log('Données du token:', tokenData);
      this.firstname = tokenData.firstname;
      this.lastname = tokenData.lastname;
      this.email = tokenData.email;
      this.picture = tokenData.picture;
      // Utilisez les données du token comme nécessaire pour spécifier le profil de l'utilisateur
    },
    (error) => {
      console.error('Erreur lors de la récupération des données du token:', error);
    }
  );
}

}
