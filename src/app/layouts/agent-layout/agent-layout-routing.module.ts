import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgentLayoutComponent} from './agent-layout.component';

const routes: Routes = [
  {path:'',
  component: AgentLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentLayoutRoutingModule { }
