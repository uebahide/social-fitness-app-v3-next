import { cn } from '@/lib/utils'
import React from 'react'

export const PrimaryButton = ({type = undefined, className, children} : {type? : "submit" | "reset" | "button" | undefined, className?: string, children: React.ReactNode}) => {
  return (
    <button type={type} className={cn(className, "rounded-lg px-2 py-1 cursor-pointer bg-brand-primary-300 hover:bg-brand-primary-400 shadow-sm")}>
        {children}
    </button>
  )
}
