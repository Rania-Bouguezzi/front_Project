import { Component } from '@angular/core';
import { DriversService } from './drivers.service';
import { CommonModule } from '@angular/common';
import { AvatarModule, CardModule, FormModule, GridModule, InputGroupComponent } from '@coreui/angular';
import { LoginService } from 'src/app/pages/login/login.service';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';


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
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, AvatarModule,DataTablesModule,CardModule,GridModule,CardModule, InputGroupComponent, FormModule, ReactiveFormsModule, MatRadioModule],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent {
  drivers:any[]=[];
  message:string="";
  delete1:boolean=false;
  idAgency:string="";
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  anyDriver:string='';
  emptymessage:boolean=false;
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
  constructor(private shareService : DriversService, private authService: LoginService){}
  
  
  
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
    
    };
    this.loaddrivers();
  }
  
  loaddrivers(): void {
    this.authService.getTokenData().subscribe(
      (response) => {
        this.idAgency= response.agency.id;
       console.log(this.idAgency)
     
     
    
    this.shareService.getDriversByAgency(this.idAgency).subscribe(
      (data: any[]) => {
        if (data.length === 0) {
          this.anyDriver = "Any Driver !";
        } else {
        this.drivers = data;
        this.dtTrigger.next(null);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des transfers :', error);
      }
    ); })
  }
  deleteDriver(id: string): void {
    const confirmation = window.confirm('You want to delete this Driver ?');
    if (confirmation) {
  
      this.shareService.deleteDriver(id).subscribe(() => {
        this.message = "isDeleted";
  
        this.delete1=true;
        console.log(this.delete1, this.message);
        
       // this.router.navigate(['/'])
      // console.log(this.delete)
      //  this.loadUsers();
       
      
        },
        error => {
          console.error('Erreur lors de la suppression de Driver :', error);
        }
      );
    } else {
   
      console.log('Suppression annulée');
    }
  }




  
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
  
  
  async onSubmit() {
    if (this.myFormRegister.invalid) {
  
      this.emptymessage = true;
      console.log(this.emptymessage);
      return;
    }
  
    const user = this.myFormRegister.value;
    console.log(user);
    try {
      const response = await this.shareService.addDriver(user);
  
      console.log('Agent adeed', response);
      this.message = "Driver Created!";
      this.emptymessage = true;
      this.myFormRegister.reset();
    } catch (error) {
      console.error('Error creating user:', error);
      this.message = "Driver was not created!";
     
    }
  }
  
  

  
  }
  
