import { Component } from '@angular/core';
import {  CardModule, GridModule, InputGroupComponent } from '@coreui/angular';

@Component({
  selector: 'app-page404',
  standalone:true,
  imports: [GridModule,CardModule, InputGroupComponent],
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component {

  constructor() { }

}
