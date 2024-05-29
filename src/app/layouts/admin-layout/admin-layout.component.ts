import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';



@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  constructor(private router: Router) { }

  ngOnInit() {
}
}


