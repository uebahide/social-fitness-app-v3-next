'use client'
import { useFormStatus } from 'react-dom'
import { PrimaryButton } from './PrimaryButton'
import { Spinner } from '../ui/spinner'

export const RegisterButton = () => {
  const { pending } = useFormStatus()
  return (
    <PrimaryButton className="flex justify-center">
        {
            pending ? <Spinner/> : "Register"
        }
    </PrimaryButton>
  )
}
