import React from 'react'


// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

//Admin Transactions

const Registration = React.lazy(() => import('./components/Admin/CreateUser'))
const RegisteredUsers = React.lazy(() => import('./components/Admin/UserList'))
const EditUser = React.lazy(() => import('./components/Admin/EditUser'))
const CreateGroup = React.lazy(() => import('./components/Admin/CreateGroup'))
const CreateTask = React.lazy(() => import('./components/Admin/CreateTask'))
const ResetPassword = React.lazy(() => import('./components/Admin/ResetPassword'))
const ViewGroups = React.lazy(() => import('./components/Admin/ViewGroups'))
const AssignTaskUsers = React.lazy(() => import('./components/Admin/AssignTaskUsers'))
const ViewGroupUsers = React.lazy(() => import('./components/Admin/ViewGroupUsers'))
const ViewTasks = React.lazy(() => import('./components/Admin/ViewTasks'))


//User Transactions

const ViewGroupTasks = React.lazy(() => import('./components/User/ViewGroupTasks'))
const AssignedTasks = React.lazy(() => import('./components/User/AssignedTasks'))
const TaskDetails = React.lazy(() => import('./components/User/TaskDetails'))
const DragDrop2 = React.lazy(() => import('./components/User/DragDrop2'))

// Base
 const Cards = React.lazy(() => import('./views/base/cards/Cards'))

const routes = [
  // {path:'/layout', exact: true, name:'DefaultLayout', component:DefaultLayout} ,

  { path: '/', exact: true, name: 'Home' , component: Dashboard},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/Registration', name: 'Registration', component: Registration },
  { path: '/base/RegisteredUsers', name: 'RegisteredUsers', component: RegisteredUsers },
  { path: '/EditUser' , name: 'EditUser', component:EditUser },
  { path: '/EditUser/:id', name: 'EditUser', component:EditUser  },
  { path: '/base/CreateGroup', name: 'CreateGroup', component: CreateGroup },
  { path: '/base/CreateTask', name: 'CreateTask', component: CreateTask },
  { path: '/base/ResetPassword', name: 'ResetPassword', component: ResetPassword },
  { path: '/base/ViewGroups', name: 'ViewGroups', component: ViewGroups },
  { path: '/base/AssignTaskUsers', name: 'AssignTaskUsers', component: AssignTaskUsers },
  { path: '/ViewGroupUsers', name: 'ViewGroupUsers', component: ViewGroupUsers },
  { path: '/base/ViewTasks', name: 'ViewTasks', component: ViewTasks },
  { path: '/base/ViewGroupTasks', name: 'ViewGroupTasks', component: ViewGroupTasks },
  { path: '/base/AssignedTasks', name: 'AssignedTasks', component: AssignedTasks },
  { path: '/TaskDetails' , name: 'TaskDetails', component:TaskDetails },
  { path: '/base/DragDrop2', name: 'DragDrop2', component: DragDrop2 },  
   { path: '/base/cards', name: 'Cards', component: Cards },
]

export default routes
