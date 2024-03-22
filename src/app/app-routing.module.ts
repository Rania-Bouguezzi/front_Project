import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { BusesModule } from './views/buses/buses.module';
import { BusesComponent } from './views/buses/buses.component';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  //{path:'buses', component:BusesComponent},
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      }, {
       path: 'buses',
        loadChildren: () =>
          import('./views/buses/buses.module').then((m) => m.BusesModule)
      },
      {
        path: 'missions',
         loadChildren: () =>
           import('./views/missions/missions.module').then((m) => m.MissionsModule)
       },
       {
        path: 'transfers',
         loadChildren: () =>
           import('./views/transfers/transfers.module').then((m) => m.TransfersModule)
       },
       {
        path: 'bookings',
         loadChildren: () =>
           import('./views/bookings/bookings.module').then((m) => m.BookingsModule)
       },
       {
        path: 'payment',
         loadChildren: () =>
           import('./views/payment/payment.module').then((m) => m.PaymentModule)
       },
       {
        path: 'customers',
         loadChildren: () =>
           import('./views/users/customers/customers.module').then((m) => m.CustomersModule)
       },
       {
        path: 'drivers',
         loadChildren: () =>
           import('./views/users/drivers/drivers.module').then((m) => m.DriversModule)
       },
       {
        path: 'agents',
         loadChildren: () =>
           import('./views/users/agents/agents.module').then((m) => m.AgentsModule)
       },
    
    ]
  },

 
  
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
