import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import {
  AvatarModule,

} from '@coreui/angular';



@NgModule({
  declarations: [],
  imports: [
    AvatarModule,

    CustomersRoutingModule,


  ] 
})
export class CustomersModule { }
