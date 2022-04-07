import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader,AppUserSideBar } from '../components/index'
import  { Component } from "react";
import Login from '../views/pages/login/Login';

//class DefaultLayout  extends Component  {
  const DefaultLayout=(props)=>{
 // render() {
    const role =localStorage.getItem("role");
  return ( 
    (role == "Admin") ?
    (
       <>      
      <AppSidebar />          
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      </>   
    )
     :
     ( (role == "User") ?(
     <>       
     <AppUserSideBar/>
     <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>   
      </>       
  ) :
  ( 
    <>
     <Login {...props} />)
     </>
  )
     ))
//}
}

export default DefaultLayout;
