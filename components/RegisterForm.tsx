
'use client'

import { register } from '@/app/(auth)/action'
import { useActionState } from 'react'

const initialState = {
    errors : {},
    message: "",
    data: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    }
}

export const RegisterForm = () => {
  const [state, formAction] = useActionState(register, initialState)
  return (
    <form action={formAction} className="flex flex-col items-left gap-1">
        <div className="flex gap-2">
            <label htmlFor="name">Name</label>
            <input defaultValue={state.data.name} type="text" id="name" name="name" className="border rounded-sm border-gray-400" required/>
            <div className='text-red-500'>{state.errors['name']}</div>
        </div>
        <div className="flex gap-2">
            <label htmlFor="email">Email</label>
            <input defaultValue={state.data.email} type="email" id="email" name="email" className="border rounded-sm border-gray-400" required/>
            <div className='text-red-500'>{state.errors['email']}</div>
        </div>
        <div className="flex gap-2">
            <label htmlFor='password'>Password</label>
            <input defaultValue={state.data.password} type="password" id="password" name="password" className="border rounded-sm border-gray-400" required/>
            <div className='text-red-500'>{state.errors['password']}</div>
        </div>
        <div className="flex gap-2">
            <label htmlFor='password_confirmation'>Password Confirmation</label>
            <input defaultValue={state.data.password_confirmation} type="password" id="password_confirmation" name="password_confirmation" className="border rounded-sm border-gray-400" required/>
            <div className='text-red-500'>{state.errors['password_confirmation']}</div>
        </div>
        <button type="submit" className="rounded-lg px-2 py-1 cursor-pointer bg-brand-primary-300 hover:bg-brand-primary-400 shadow-sm" >
            Register
        </button>
    </form>
  )
}
