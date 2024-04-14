import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {DefaultHeaderService} from './default-header.service'
import { AvatarModule, ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  firstname : string ='';
  lastname : string ='';
  email : string ='';
  picture : string ='';
  status : string ='';
  constructor(private classToggler: ClassToggleService , private tokenService :DefaultHeaderService ) {
    super();
  }

  




 ngOnInit(): void {
  this.tokenService.getTokenData().subscribe(
    (tokenData) => {
  //    console.log('Données du token:', tokenData);
      this.firstname = tokenData.firstname;
      this.lastname = tokenData.lastname;
      this.email = tokenData.email;
      this.picture = tokenData.picture;
      this.status = tokenData.status;
      // Utilisez les données du token comme nécessaire pour spécifier le profil de l'utilisateur
    },
    (error) => {
      console.error('Erreur lors de la récupération des données du token:', error);
    }
  );
}
}
