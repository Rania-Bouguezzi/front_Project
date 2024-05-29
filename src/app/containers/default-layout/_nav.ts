
import { INavData } from '@coreui/angular';


export const navItems: INavData[] = [

  {title: true,
  name:''},
  {
    name: 'Dashboard',
   url: 'dashboard',
    iconComponent: { name: 'cil-speedometer' },
   
  },

  {
    name: 'Buses',
    url: 'buses',
    iconComponent: { name: 'cilBusAlt' }
  },
  {
    name: 'Transfers',
    url: 'transfers',
    iconComponent: { name: 'cilTransfer' }
  },
  {
    name: 'Missions',
   url: 'missions',
    iconComponent: { name: 'cilNoteAdd' }
  },

  {
    name: 'Bookings',
    url: 'bookings',
    iconComponent: { name: 'cilCheckAlt' }
  },
  {
    name: 'Payment',
   url: 'payment',
    iconComponent: { name: 'cilMoney' }
  },
    {
      name: 'Users',
      url: '/',
      iconComponent: { name: 'cilUser' },
      children: [
        {
          name: 'Agents',
        url: 'agents',
        iconComponent: { name: 'cilWalk' },
        },
        {
          name: 'Drivers',
          url: 'drivers',
          iconComponent: { name: 'cilCarAlt' },
        },],
      },
        {
          name: 'Offers',
          url: 'profile',
          iconComponent: { name: 'cilTag' },
          badge:  { text: 'New', color: 'success' },
        },
        {
          name: 'Need Transfer',
          url: 'needs-transfer',
          iconComponent: { name: 'cilBullhorn' },
          badge:  { text: '', color: 'success' },
        },

        
];

export const navAdmin :INavData[] = [

  {title: true,
  name:''},
  {
    name: 'Dashboard',
   url: 'dashboard',
    iconComponent: { name: 'cil-speedometer' },
   
  },
  {
    name: 'Agency',
   url: 'agency',
    iconComponent: { name: 'cilInstitution' },
   
  },
  {
    name: 'Super Agent',
  url: 'supers_agents',
  iconComponent: { name: 'cilWalk' },
  },
  {
    name: 'Agent',
    url: 'agents',
    iconComponent: { name: 'cilWalk' },
  },  
  {
    name: 'All Users',
    url: 'users',
    iconComponent: { name: 'cilUser' },
  },  

]  