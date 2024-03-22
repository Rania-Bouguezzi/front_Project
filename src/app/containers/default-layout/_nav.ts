import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {title: true,
  name:''},
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
   
  },

  {
    name: 'Buses',
    url: 'buses',
    iconComponent: { name: 'cilBusAlt' }
  },
  {
    name: 'Transfers',
    url: '/transfers',
    iconComponent: { name: 'cilTransfer' }
  },
  {
    name: 'Missions',
    url: '/missions',
    iconComponent: { name: 'cilNoteAdd' }
  },

  {
    name: 'Bookings',
    url: '/bookings',
    iconComponent: { name: 'cilCheckAlt' }
  },
  {
    name: 'Payment',
    url: '/payment',
    iconComponent: { name: 'cilMoney' }
  },

  {
    name: 'Users',
    url: '',
    iconComponent: { name: 'cilUser' },
    children: [
      {
        name: 'Agents',
        url: '/agents',
        iconComponent: { name: 'cilWalk' },
      },
      {
        name: 'Custmers',
        url: '/customers',
        iconComponent: { name: 'cilWc' },
      },
      {
        name: 'Drivers',
        url: '/drivers',
        iconComponent: { name: 'cilCarAlt' },
      },
 
     
    ]
  },

];
