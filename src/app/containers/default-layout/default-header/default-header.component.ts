import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {DefaultHeaderService} from './default-header.service'
import { AvatarModule, ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/pages/login/login.service';
import { NotificationService } from 'src/app/layouts/agent-layout/views/notification/notification.service';

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
  showAlert:boolean=false;
  agencyId:string='';
  count:number=0;
  constructor(private classToggler: ClassToggleService , private tokenService :DefaultHeaderService, private router:Router,
  private notifService : NotificationService
  ) {
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
      this.agencyId = tokenData.agency.id;
      console.log(this.agencyId);
      this.notifService.getNotifByAgency(this.agencyId).subscribe(
        (data: any[]) => {
          this.count = data.length;
         
        },
        (error) => {
          console.error('Erreur lors de la récupération des notifications :', error);
        }
      ); 

      // Utilisez les données du token comme nécessaire pour spécifier le profil de l'utilisateur
    },
    (error) => {
      console.error('Erreur lors de la récupération des données du token:', error);
    }
  );
}


logout(){
  this.tokenService.getTokenData().subscribe(
    (tokenData) => {
      localStorage.removeItem('access_token'); // Assurez-vous de supprimer la clé correcte
      console.log('Token supprimé du localStorage');
    },
    (error) => {
      console.error('Erreur lors de la suppression du token:', error);
    }
  );
  
  
   this.router.navigate(['/login']);

}
go(){
  this.router.navigate(['agent-layout/notification']);
}
}
