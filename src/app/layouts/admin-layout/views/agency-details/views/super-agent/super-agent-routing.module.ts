import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SuperAgentComponent} from './super-agent.component'

const routes: Routes = [
  {path: '', component: SuperAgentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAgentRoutingModule { }
