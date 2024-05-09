import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  SharedModule, TableModule } from '@coreui/angular';

import {BusesRoutingModule} from './buses-routing.module'
import { DataTablesModule } from 'angular-datatables';




@NgModule({

  declarations: [ ],
  imports: [

CommonModule,
  
    BusesRoutingModule,
    TableModule,
    SharedModule,
    DataTablesModule
  
  ],   
})
export class BusesModule { }
