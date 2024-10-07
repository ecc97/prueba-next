'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import styled from 'styled-components'


interface UserRegister {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

const initialStateRegister: UserRegister = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
}

export default function RegisterPage() {
  const traduction = useTranslations("RegisterView")
  const router = useRouter()
  const [registerState, setRegisterState] = React.useState<UserRegister>(initialStateRegister)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setRegisterState((prevState) => ({...prevState, [name]: value }))
  }
  
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
  
    if (registerState.password!== registerState.passwordConfirm) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    try {
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: registerState.username, email: registerState.email, password: registerState.password }),
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error( errorData.message || "Error al registrar la cuenta")
      }

      const data = await res.json()
      console.log(data)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
    
    </>
  )
}