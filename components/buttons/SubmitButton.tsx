'use client'
import { useFormStatus } from 'react-dom'
import { Spinner } from '../ui/spinner'
import { Button } from './Button'
import { buttonColor } from '@/types/buttonType'
import { cn } from '@/lib/utils'

export const SubmitButton = ({color = "primary", className ,children} : {color?:buttonColor, className?:string, children: React.ReactNode}) => {
  const { pending } = useFormStatus()
  return (
    <Button 
        color={color} 
        type_property='submit' 
        className={cn(className)}
    >
        {
            pending ? <Spinner/> : children
        }
    </Button>
  )
}
