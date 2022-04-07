import React from 'react'
import CIcon from '@coreui/icons-react'
import {  cilPuzzle,  cilSpeedometer,} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  }, 
  {
    component: CNavTitle,
    name: 'Components',
  },
  
  {    
    component: CNavGroup,
    name: 'Transactions',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Completed & Done',
        to: '/base/DragDrop2',
      },
       {
         component: CNavItem,
         name: 'Pending Group Tasks',
         to: '/base/ViewGroupTasks',
       },      
    ],
  }, 
]

export default _nav
