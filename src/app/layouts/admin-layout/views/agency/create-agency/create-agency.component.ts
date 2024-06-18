import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { AgencyService } from '../agency.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-agency',
  standalone: true,
  imports: [ReactiveFormsModule, MatRadioModule, CommonModule],
  templateUrl: './create-agency.component.html',
  styleUrl: './create-agency.component.scss'
})
export class CreateAgencyComponent {

success:boolean=false;
  constructor(private router : Router, private agencyService : AgencyService){}

myFormAgency= new FormGroup({
  name: new FormControl('', Validators.required),
  logo: new FormControl('', Validators.required),
  emailAgency: new FormControl('', [Validators.required, Validators.email]),
  website: new FormControl('', Validators.required),
  phoneAgency: new FormControl('', Validators.required),
  addressAgency: new FormControl('', Validators.required),


});

SPAForm= new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  firstname: new FormControl('', Validators.required),
  lastname: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),
  birthDate: new FormControl('', Validators.required),
  address: new FormControl('', Validators.required),
  picture: new FormControl('', Validators.required),
  phone: new FormControl('', Validators.required),
  genre: new FormControl('', Validators.required),
});

function () {
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll('.needs-validation')
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form: HTMLFormElement) {
      form.addEventListener('submit', function (event: Event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          console.log('non valide')
        }
        else {
         
          console.log(' valide')
        }
        form.classList.add('was-validated');
      }, false);
      
    })
   
}



async onSubmit(): Promise<void> {
  if (this.myFormAgency.valid && this.SPAForm.valid) {
    const agencyData = this.myFormAgency.value;
    const superAdminData = this.SPAForm.value;
    console.log(agencyData);
    console.log(superAdminData);

    // Combine agencyData and superAdminData into a single object
    const requestData = {
      "name": agencyData.name,
      "logo": agencyData.logo,
      "emailAgency": agencyData.emailAgency,
      "website": agencyData.website,
      "phoneAgency": agencyData.phoneAgency,
      "addressAgency": agencyData.addressAgency,
      "email": superAdminData.email,
      "firstname": superAdminData.firstname,
      "lastname": superAdminData.lastname,
      "password": superAdminData.password,
      "birthDate": superAdminData.birthDate,
      "address": superAdminData.address,
      "picture": superAdminData.picture,
      "phone": superAdminData.phone,
      "genre": superAdminData.genre
    };

    try {
      const response = await this.agencyService.createAgency(requestData);
      this.success=true;
      this.myFormAgency.reset();
      this.SPAForm.reset();
      console.log('Agency and Super Agent created successfully', response);
    } catch (error) {
      console.error('Error creating Agency and Super Agent', error);
    }
  } else {
    this.success=false;
   console.log('erreur');
  }
}
goBack(){
  this.router.navigate(['admin/agency']);
}

}











