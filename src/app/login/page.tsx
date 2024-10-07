'use client'

import React from 'react'
import LoginFormContainer from '@/components/LoginComponent/Login'
import { useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar/Navbar'
import SelectLanguage from '@/components/SelectLanguage/SelectLanguage'
import Link from 'next/link'


export default function LoginPage() {
  const traduction = useTranslations("LoginView");

  return (
    <div>
      <Navbar>
        <h1>{traduction("titleNav")}</h1>
        <div>
          <Link href='/register'>{traduction("linkRegNav")}</Link> 
          <SelectLanguage />
        </div>
      </Navbar>
      <LoginFormContainer />
    </div>
  )
}