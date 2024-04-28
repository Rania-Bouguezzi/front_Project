import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BusesComponent} from './buses.component'
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, ProgressModule, SharedModule, TableModule, TabsModule } from '@coreui/angular';
import { WidgetsModule } from '../widgets/widgets.module';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
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
