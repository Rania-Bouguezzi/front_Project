
import { CommonModule, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  CardModule, GridModule, InputGroupComponent } from '@coreui/angular';
import{LoginService} from './login.service'
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-login',
  standalone:true,
  imports: [GridModule,CardModule, InputGroupComponent, NgStyle, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
 // directives: [ NgStyle]
})
export class LoginComponent {
  invalid:boolean=false;
  message:string ='';
  firstname : string ='';
   lastname : string ='';
    email : string ='' ;
    picture : string =''
    showPassword: boolean = false;
    icon:any;
  

  myFormLogin = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor( private router : Router, private authService : LoginService) {

    } 
   

  test(){

  (function () {
    'use strict'
  
    const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form: HTMLFormElement) {
        form.addEventListener('submit', function (event: Event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
  })();}


onSubmit(){
  const val = this.myFormLogin.value;
  //const formData = JSON.stringify(this.myFormLogin.value);
  if (val.email && val.password) {
      this.authService.Authentification(val.email, val.password)
          .subscribe(
            (response) => {
              console.log('User is logged in');
              console.log(response.role);
              if (response && response.access_token && response.role) {
              this.firstname = response.payload_.firstname;
              this.lastname = response.payload_.lastname;
              this.email = response.payload_.email;
              this.picture = response.payload_.picture;
    
                // Rediriger l'utilisateur en fonction de son rôle
                if (response.role === 'Agent' ) {
                  this.router.navigateByUrl('/agent-layout/dashboard');
                } else if (response.role === 'SuperAgent')  {
                  this.router.navigateByUrl('/super-agent-layout/dashboard');
                }else if (response.role === 'Driver')  {
                  this.router.navigateByUrl('/driver');
                }else if (response.role === 'SuperAdmin')  {
                  this.router.navigateByUrl('/admin');
                }    
                
                sessionStorage.setItem('access_token', response.access_token);
              
              } else {
                console.error('Access token or role not found in response');
               
              }
            },
            (error) => {
              this.invalid=true;
              console.log(this.invalid);
              this.message='Invalid Password or Email'
              console.error('Authentication error:', error);
     
            }
          );
  }
 

}




  Register(){
     this.router.navigate(['/register']);
  }

  ShowPassword() {
    this.showPassword = !this.showPassword;

  }
}
