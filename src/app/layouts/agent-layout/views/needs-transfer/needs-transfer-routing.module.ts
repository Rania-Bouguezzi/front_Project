import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NeedsTransferComponent} from './needs-transfer.component'

const routes: Routes = [
  {path:'',
  component: NeedsTransferComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeedsTransferRoutingModule { }
