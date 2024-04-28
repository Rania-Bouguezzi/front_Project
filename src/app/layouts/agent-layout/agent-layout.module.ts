import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  AgentLayoutRoutingModule} from './agent-layout-routing.module'
import { NavbarComponent } from './views/navbar/navbar.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarComponent,
    AgentLayoutRoutingModule,
  ]
})
export class AgentLayoutModule { }
