import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransfersComponent } from './transfers.component'

const routes: Routes = [
  {path:'',
component: TransfersComponent},
{path:':id', component: TransfersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersRoutingModule { 





}
