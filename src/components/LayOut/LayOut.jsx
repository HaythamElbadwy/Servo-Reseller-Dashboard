import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './LayOut.module.css';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function LayOut() {
  return (
    <>
      <Sidebar />

      <Outlet />

      <Footer />
    </>
  )
}
