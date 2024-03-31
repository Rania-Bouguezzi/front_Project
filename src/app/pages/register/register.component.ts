


import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  CardModule, FormModule, GridModule, InputGroupComponent } from '@coreui/angular';
import {RegisterService} from './register.service';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';


/** passwords must match - custom validator */
export class PasswordValidators {
  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');
    if (password?.valid && password?.value === confirm?.value) {
      confirm?.setErrors(null);
      return null;
    }
    confirm?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
}

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [GridModule,CardModule, InputGroupComponent, FormModule, ReactiveFormsModule, MatRadioModule,CommonModule ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent {
  emptymessage:boolean=false;
  message:string="";
  verifyPwd:boolean=false;

  
  myFormRegister = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    verifyPassword: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),

  
  });
 
 
  constructor(
    private formBuilder: FormBuilder,private router : Router, private registerService : RegisterService){
    
    }
  
  



// Example starter TypeScript for disabling form submissions if there are invalid fields


passwordMatchValidator(myFormRegister: FormGroup) {
  const password = this.myFormRegister.value.password;
  const verifyPassword = this.myFormRegister.value.verifyPassword;

  if (password !== verifyPassword) {
    this.verifyPwd=true;
  } else {
   this.verifyPwd=false;
  }

  return null;
}





  // Example starter JavaScript for disabling form submissions if there are invalid fields
// Example starter TypeScript for disabling form submissions if there are invalid fields
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


onSubmit() {
  if (this.myFormRegister.invalid) {

    this.emptymessage = true;
    console.log(this.emptymessage);
    return;
  }

  const username = this.myFormRegister.value.username  || '';
  const email = this.myFormRegister.value.email || '';
  const firstname = this.myFormRegister.value.firstname || '';
  const lastname = this.myFormRegister.value.lastname || '';
  const password = this.myFormRegister.value.password || '';
  const birthDate = this.myFormRegister.value.birthDate || '';
  const address = this.myFormRegister.value.address || '';
  const picture = this.myFormRegister.value.picture || '';
  const phone = this.myFormRegister.value.phone || '';
  const genre = this.myFormRegister.value.genre || '';
  const formData = JSON.stringify(this.myFormRegister.value);
  this.registerService.Register(

  username,
   email, 
   firstname, 
   lastname, 
   password, 
   birthDate, 
   address, 
   picture, 
   phone, 
   genre 

  ).subscribe(
    () => {
      console.log('User created !');
      this.message = "Bus Created !";
      this.emptymessage = false;
  
      this.myFormRegister.reset();
     //this.router.navigate(['/'])
      
    //  this.router.navigate(['/'])

    },

  );
  console.log(formData)
}




  

  LogIn(){
this.router.navigate(['/login']);
  }
}




