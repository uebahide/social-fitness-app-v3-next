
'use client'

import { login } from '@/app/(auth)/action'
import { useActionState } from 'react'


const initialState = {
    error: "",
    data : {
        email: "",
        password: ""
    }
}

export const LoginForm = () => {
  const [state, formAction] = useActionState(login, initialState)

  return (
    <form action={formAction} className="flex flex-col items-left gap-1">
        <div className='text-red-500'>{state.error}</div>
        <div className="flex gap-2">
            <label htmlFor="email">Email</label>
            <input defaultValue={state.data.email} type="email" id="email" name="email" className="border rounded-sm border-gray-400" required/>
        </div>
        <div className="flex gap-2">
            <label htmlFor='password'>Password</label>
            <input defaultValue={state.data.password} type="password" id="password" name="password" className="border rounded-sm border-gray-400" required/>
        </div>
        <button type="submit" className="rounded-lg px-2 py-1 cursor-pointer bg-brand-primary-300 hover:bg-brand-primary-400 shadow-sm" >
            Login
        </button>
    </form>
  )
}
