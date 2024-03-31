import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import{FrontLayoutComponent} from './layouts/front-layout/front-layout.component'
import {Page404Component} from './pages/page404/page404.component'
import {Page500Component} from './pages/page500/page500.component'
import {RegisterComponent} from './pages/register/register.component'
import {LoginComponent} from './pages/login/login.component'


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  {path:'', component:FrontLayoutComponent},

  {
    path: 'agent-layout',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./layouts/agent-layout/views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      }, {
       path: 'buses',
        loadChildren: () =>
          import('./layouts/agent-layout/views/buses/buses.module').then((m) => m.BusesModule)
      },
      {
        path: 'missions',
         loadChildren: () =>
           import('./layouts/agent-layout/views/missions/missions.module').then((m) => m.MissionsModule)
       },
       {
        path: 'transfers',
         loadChildren: () =>
           import('./layouts/agent-layout/views/transfers/transfers.module').then((m) => m.TransfersModule)
       },
       {
        path: 'bookings',
         loadChildren: () =>
           import('./layouts/agent-layout/views/bookings/bookings.module').then((m) => m.BookingsModule)
       },
       {
        path: 'payment',
         loadChildren: () =>
           import('./layouts/agent-layout/views/payment/payment.module').then((m) => m.PaymentModule)
       },
       {
        path: 'customers',
         loadChildren: () =>
           import('./layouts/agent-layout/views/users/customers/customers.module').then((m) => m.CustomersModule)
       },
       {
        path: 'drivers',
         loadChildren: () =>
           import('./layouts/agent-layout/views/users/drivers/drivers.module').then((m) => m.DriversModule)
       },
       {
        path: 'agents',
         loadChildren: () =>
           import('./layouts/agent-layout/views/users/agents/agents.module').then((m) => m.AgentsModule)
       },
    
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },

  {path:'**', component:Page404Component},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,  
      {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      useHash:false
      // relativeLinkResolution: 'legacy'
    }
 
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}