import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgencyProfileComponent} from './agency-profile.component'

const routes: Routes = [
  {path:'',
component: AgencyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyProfileRoutingModule { }
