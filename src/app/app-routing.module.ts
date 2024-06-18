import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import {Page404Component} from './pages/page404/page404.component'
import {Page500Component} from './pages/page500/page500.component'
import {RegisterComponent} from './pages/register/register.component'
import {LoginComponent} from './pages/login/login.component'
import {guardGuard} from './guard/guard.guard'
import {superAgentGuard} from './guard/super-agent.guard'
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component'
import {DriverLayoutComponent} from './layouts/driver-layout/driver-layout.component'
import {adminGuard} from './guard/admin.guard'
import {driverGuard} from './guard/driver.guard'
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {path:'admin', component:DefaultLayoutComponent , canActivate:[adminGuard],
  children: [
    {
      path: 'agent/:id',
      loadChildren: () =>
        import('./layouts/admin-layout/views/agency-details/views/agent/agent.module').then((m) => m.AgentModule)
    },
    {
      path: 'super-agent/:id',
      loadChildren: () =>
        import('./layouts/admin-layout/views/agency-details/views/super-agent/super-agent.module').then((m) => m.SuperAgentModule)
    },
    {
      path: 'bus/:id',
      loadChildren: () =>
        import('./layouts/admin-layout/views/agency-details/views/bus/bus.module').then((m) => m.BusModule)
    },
    {
      path: 'driver/:id',
      loadChildren: () =>
        import('./layouts/admin-layout/views/agency-details/views/driver/driver.module').then((m) => m.DriverModule)
    },
    {
      path: 'transfer/:id',
      loadChildren: () =>
        import('./layouts/admin-layout/views/agency-details/views/transfer/transfer.module').then((m) => m.TransferModule)
    },
    {
      path: 'mission/:id',
      loadChildren: () =>
        import('./layouts/admin-layout/views/agency-details/views/mission/mission.module').then((m) => m.MissionModule)
    },
    {
      path: 'agency',
      loadChildren: () =>
        import('./layouts/admin-layout/views/agency/agency.module').then((m) => m.AgencyModule)
    },
    {
      path: 'agency/add',
      loadChildren: () =>
        import('./layouts/admin-layout/views/agency/create-agency/create-agency.module').then((m)=>m.CreateAgencyModule)
    },
    {
      path: 'agencyDetails/:id',
      loadChildren: () =>
        import('./layouts/admin-layout/views/agency-details/agency-details.module').then((m) => m.AgencyDetailsModule)
    },
    {
      path: 'users',
      loadChildren: () =>
        import('./layouts/admin-layout/views/users/users.module').then((m) => m.UsersModule)
    },

  ]

  },
  {path:'driver', component:DriverLayoutComponent, canActivate:[driverGuard],
  },


  {
    path: 'agent-layout', canActivate:[guardGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('./layouts/agent-layout/agent-layout.module').then((m) => m.AgentLayoutModule)
      },
      {
        path: 'agencyProfile/:id',
        loadChildren: () =>
          import('./layouts/agent-layout/views/agency-profile/agency-profile.module').then((m) => m.AgencyProfileModule)
      },
      {
        path: 'needs-transfer',
        loadChildren: () =>
          import('./layouts/agent-layout/views/needs-transfer/needs-transfer.module').then((m) => m.NeedsTransferModule)
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('./layouts/agent-layout/views/notification/notification.module').then((m) => m.NotificationModule)
      },
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
        path: 'discussion',
         loadChildren: () =>
           import('./layouts/agent-layout/views/chat/chat.module').then((m) => m.ChatModule)
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
    path: 'super-agent-layout', canActivate:[superAgentGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('./layouts/super-agent-layout/super-agent-layout.module').then((m) => m.SuperAgentLayoutModule)
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./layouts/super-agent-layout/views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      }, {
       path: 'buses',
        loadChildren: () =>
          import('./layouts/super-agent-layout/views/buses/buses.module').then((m) => m.BusesModule)
      },
      {
        path: 'missions',
         loadChildren: () =>
           import('./layouts/super-agent-layout/views/missions/missions.module').then((m) => m.MissionsModule)
       },
       {
        path: 'transfers',
         loadChildren: () =>
           import('./layouts/super-agent-layout/views/transfers/transfers.module').then((m) => m.TransfersModule)
       },
       {
        path: 'bookings',
         loadChildren: () =>
           import('./layouts/super-agent-layout/views/bookings/bookings.module').then((m) => m.BookingsModule)
       },
       {
        path: 'payment',
         loadChildren: () =>
           import('./layouts/super-agent-layout/views/payment/payment.module').then((m) => m.PaymentModule)
       },
       {
        path: 'customers',
         loadChildren: () =>
           import('./layouts/super-agent-layout/views/users/customers/customers.module').then((m) => m.CustomersModule)
       },
       {
        path: 'drivers',
         loadChildren: () =>
           import('./layouts/super-agent-layout/views/users/drivers/drivers.module').then((m) => m.DriversModule)
       },
       {
        path: 'agents',
         loadChildren: () =>
           import('./layouts/super-agent-layout/views/users/agents/agents.module').then((m) => m.AgentsModule)
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
    path: 'register',canActivate:[superAgentGuard],
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
