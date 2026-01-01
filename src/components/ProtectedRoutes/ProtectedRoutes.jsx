import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './ProtectedRoutes.module.css';
import { Navigate } from 'react-router-dom';
import Login from '../Login/Login';

export default function ProtectedRoutes({children}) {
  
    
    if (localStorage.getItem('authToken')) {
    if (window.location.pathname == "/" || window.location.pathname == '') {
      return <Navigate to={'/layout/resellerCustomer'} />
    }
    return children
  } else {
    if (window.location.pathname == "/" || window.location.pathname == '') {
      return <Login />
    }
    return <Navigate to={'/'} />
  }
    
  
}
