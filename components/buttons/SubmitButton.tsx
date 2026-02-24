'use client'
import { useFormStatus } from 'react-dom'
import { Spinner } from '../ui/spinner'
import { Button } from './Button'
import { buttonColor } from '@/types/buttonType'

export const SubmitButton = ({color = "primary", children} : {color?:buttonColor, children: React.ReactNode}) => {
  const { pending } = useFormStatus()
  return (
    <Button 
        color={color} 
        type_property='submit' 
    >
        {
            pending ? <Spinner/> : children
        }
    </Button>
  )
}
