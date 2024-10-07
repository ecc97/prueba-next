'use client'

import React from 'react'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar/Navbar'
import SelectLanguage from '@/components/SelectLanguage/SelectLanguage'
import RegisterFormContainer from '@/components/RegisterComponent/Register'


export default function RegisterPage() {
  const traduction = useTranslations("RegisterView");
  
  return (
    <>
    <Navbar>
        <h1>{traduction("titleNav")}</h1>
        <div>
          <Link href='/login'>{traduction("linkLoginNav")}</Link> 
          <SelectLanguage />
        </div>
    </Navbar>
    <RegisterFormContainer />
    </>
  )
}