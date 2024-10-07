'use client'

import React from 'react'

import Link from 'next/link'
import Navbar from '@/components/Navbar/Navbar'
import RegisterFormContainer from '@/components/RegisterComponent/Register'


export default function RegisterPage() {
  
  return (
    <>
    <Navbar>
        <h1>Store</h1>
        <div>
          <Link href='/login'>Iniciar sesión</Link> 
        </div>
    </Navbar>
    <RegisterFormContainer />
    </>
  )
}