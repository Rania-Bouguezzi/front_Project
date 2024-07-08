import { Component, OnInit } from '@angular/core';
import {UsersService} from './users.service'
import { AvatarComponent, CardHeaderComponent } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AgencyService } from '../agency/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AvatarComponent, CardHeaderComponent, CommonModule, DataTablesModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
constructor(private usersService : UsersService, private agencyService : AgencyService, private router : Router){}
users:any[]=[];
agencies:any[]=[];
dtoptions: DataTables.Settings = {};
dtTrigger:Subject<any>=new Subject<any>();
filteredUsers: any[] = [];

ngOnInit(): void {
  this.dtoptions = {pagingType: 'full_numbers',};
this.getUsers();
  this.getAgencies();
 
}


getUsers(){
  this.usersService.getAllUsers().subscribe((data)=>{
    this.users = data;
    this.filteredUsers = this.users;
    this.dtTrigger.next(null);
  });
}
onRoleChange(event: any): void {

  const selectedRole = event.target.value;
  if (selectedRole === 'AllUsers') {
    this.filteredUsers = this.users;
  } else if (selectedRole) {
    this.filteredUsers = this.users.filter(user => user.role === selectedRole);
  } else {
    this.filteredUsers = this.users;
  }
}

onAgencyChange(event: any): void {

  const selectedAgency = event.target.value;
  if (selectedAgency === 'AllAgencies') {
    this.filteredUsers = this.users;
  } else if (selectedAgency) {
    this.filteredUsers = this.users.filter(user => user.agency.name === selectedAgency);
  } else {
    this.filteredUsers = this.users;
  }
}

getAgencies() : void {
  this.agencyService.getAgency().subscribe(
    (data) => {
   this.agencies = data;
   this.dtTrigger.next(null);
});

}

userId:string='';
userData:any;
firstname:string='';
lastname:string='';
email:string='';
dateCreation:string='';
avatar:string='';
role:string='';
avatarSpa:string='';
status:string='';
phone:string='';
agencyName:string='';
address:string='';
logo:string='';
details(id: string): void {
  this.userId = id;    
  this.usersService.getById(this.userId).subscribe(data => {
    this.userData = data;
    this.firstname=data.firstname;
    this.lastname=data.lastname;
    this.email=data.email;
    this.dateCreation= data.dateCreation;
    this.avatar=data.picture;
    this.role=data.role;
    this.status=data.status;
    this.address=data.address;
    this.phone=data.phone;
    this.agencyName=data.agency.name;
    this.logo=data.agency.logo;
    // Open the update modal here
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }, error => {
    console.error('Error retrieving users data:', error);
  });
}



blockedUser(id:string){
  console.log(id);
  const confirmation = window.confirm('You want to Block this User ?');
  if (confirmation) {
  const updatedUserData ={status:'Blocked'};
  this.usersService.updateUser(id, updatedUserData).subscribe(
    () => {
     
     console.log('User was blocked!');
     this.router.navigate(['/admin/users']);
    },)



}else{
console.log('Blockage Annulé !');
}
}


UnBlockedUser(id:string){
  console.log(id);
  const confirmation = window.confirm('You want to UnBlock this User ?');
  if (confirmation) {
  const updatedUserData ={status:'Actif'};
  this.usersService.updateUser(id, updatedUserData).subscribe(
    () => {
     
     console.log('User was Deblocked!');
this.router.navigate(['/admin/users']);
    },)



}else{
console.log('Blockage Annulé !');
}
}

}
