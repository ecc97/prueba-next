'use client'

import React from 'react'
import LoginFormContainer from '@/components/LoginComponent/Login'
import Navbar from '@/components/Navbar/Navbar'
import Link from 'next/link'


export default function LoginPage() {

  return (
    <div>
      <Navbar>
        <h1>Store</h1>
        <div>
          <Link href='/register'>Registrar</Link> 
        </div>
      </Navbar>
      <LoginFormContainer />
    </div>
  )
}