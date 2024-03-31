import { Component, OnInit } from '@angular/core';
import {BusesService} from './buses.service'
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule, FormModule, GridModule,  } from '@coreui/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [CommonModule, FormModule,CardModule, GridModule,ReactiveFormsModule, RouterLink],
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.scss',
  
})
export class BusesComponent implements OnInit {
  myForm = new FormGroup({
    marque: new FormControl('', Validators.required),
    puissance: new FormControl('', Validators.required),
    nbrePlaces: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)

  });
  myFormUpdate = new FormGroup({
    marque: new FormControl('', Validators.required),
    puissance: new FormControl('', Validators.required),
    nbrePlaces: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)

  });

  buses:any[]=[];
  emptymessage: boolean = false;
  message:string="";
  busId:string="";
  busData:any;
  delete1:boolean=false;
 
constructor(private busesService: BusesService, private route:ActivatedRoute, private router:Router){

}




ngOnInit(): void {
  this.loadBuses();

/*  this.route.params.subscribe(params => {
    const id = params['id'];
    if (id) {
      this.busId = id.toString();
      console.log(this.busId);
      this.busesService.getById(this.busId).subscribe(data => {
        this.busData = data;
        this.myFormUpdate.patchValue({
          marque: this.busData.marque,
          puissance: this.busData.puissance,
          nbrePlaces: this.busData.nbrePlaces,
          status: this.busData.status
        });
      });
    } else {
      console.error('ID not found in URL params.');
    }
  });*/
}


loadBuses(): void {
  this.busesService.getAllBuses().subscribe(
    (data: any[]) => {
      this.buses = data; // Stocke les buses récupérés dans une variable locale
     // console.log(data)
    },
    (error) => {
      console.error('Erreur lors de la récupération des buses :', error);
    }
  );
}


onSubmit() {
  if (this.myForm.invalid) {

    this.emptymessage = true;
    console.log(this.emptymessage);
    return;
  }
  
  const marque = this.myForm.value.marque || '';
  const puissance = this.myForm.value.puissance || '';
  const nbrePlaces = this.myForm.value.nbrePlaces || '';
  const status = this.myForm.value.status || '';
  const formData = JSON.stringify(this.myForm.value);

  this.busesService.addBus(
    marque,
    puissance,
    nbrePlaces,
    status
  ).subscribe(
    () => {
      console.log('Bus created !');
      this.message = "Bus Created !";
      this.emptymessage = false;
   
      this.myForm.reset();
     //this.router.navigate(['/'])
      
    //  this.router.navigate(['/'])

    },
    error => {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      this.message = "Bus Does not Created !";
      this.emptymessage = false;
    }
  );
  console.log(formData)
}

updateBus(): void {
  if (this.myFormUpdate.invalid) {
this.message='Formulaire Invalid !'
    return;
  }

  const updatedBusData = this.myFormUpdate.value;

  this.busesService.updateBus(this.busId, updatedBusData).subscribe(
    () => {
      console.log('bus mis à jour avec succès !');
      this.message='Bus Updated!'
      this.resetUrlAndReload();
    },
    error => {
      console.error('Erreur lors de la mise à jour de bus :', error);
      this.message='Bus Does Not Updated !'
     
    }
  );
 }


 resetUrlAndReload(): void {
  // Réinitialise l'URL en supprimant l'ID
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/buses']); // Recharge la page
  });
}






deleteBus(id: string): void {
  const confirmation = window.confirm('You want to delete this Bus ?');
  if (confirmation) {

    this.busesService.deleteBus(id).subscribe(() => {
      this.message = "isDeleted";

      this.delete1=true;
      console.log(this.delete1, this.message);
      
     // this.router.navigate(['/'])
    // console.log(this.delete)
    //  this.loadUsers();
     
    
      },
      error => {
        console.error('Erreur lors de la suppression de Bus :', error);
      }
    );
  } else {
 
    console.log('Suppression annulée');
  }
}






openUpdateModal(id: string): void {
  this.busId = id;    //id bus récupéré depuis la table affichée
  console.log(this.busId);
  this.busesService.getById(this.busId).subscribe(data => {
    this.busData = data;
    this.myFormUpdate.patchValue({
      marque: this.busData.marque,
      puissance: this.busData.puissance,
      nbrePlaces: this.busData.nbrePlaces,
      status: this.busData.status
    });
    // Open the update modal here
    const modal = document.getElementById('ModalUpdate');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }, error => {
    console.error('Error retrieving bus data:', error);
  });
}



}



