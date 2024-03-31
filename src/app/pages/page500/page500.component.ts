import { Component } from '@angular/core';
import {  CardModule, GridModule, InputGroupComponent } from '@coreui/angular';


@Component({
  selector: 'app-page500',
  standalone:true,
  imports: [GridModule,CardModule, InputGroupComponent],
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.scss']
})
export class Page500Component {

  constructor() { }

}
