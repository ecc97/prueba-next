'use client'

import React from 'react'
import LoginFormContainer from '@/components/LoginComponent/Login'
import Navbar from '@/components/Navbar/Navbar'
import Link from 'next/link'
import styles from '../page.module.css'


export default function LoginPage() {

  return (
    <div>
      <Navbar>
        <h1>Store</h1>
        <div className={styles.navLink}>
          <Link href='/register'>Registrar</Link> 
        </div>
      </Navbar>
      <LoginFormContainer />
    </div>
  )
}