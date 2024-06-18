import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateAgencyComponent} from './create-agency.component'

const routes: Routes = [
  {path:'', component: CreateAgencyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAgencyRoutingModule { }
