import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SuperAgentLayoutComponent} from './super-agent-layout.component'


const routes: Routes = [
  {path:'',
  component: SuperAgentLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAgentLayoutRoutingModule { }
