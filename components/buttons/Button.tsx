import { cn } from '@/lib/utils'
import { buttonColor } from '@/types/buttonType'
import React from 'react'

export const Button = ({color="primary", type = undefined, className, disabled=false, children} : {color: buttonColor, type? : "submit" | "reset" | "button" | undefined, className?: string, disabled?:boolean ,children: React.ReactNode}) => {  
    return (
    <button 
        type={type} 
        className={
            cn( 
                color=="primary" &&  "bg-brand-primary-300 hover:bg-brand-primary-400 disabled:bg-brand-primary-300",
                color=="secondary" && "bg-brand-secondary-300 hover:bg-brand-secondary-400 disabled:bg-brand-secondary-300",
                "rounded-lg px-2 py-1 cursor-pointer shadow-sm min-h-8 flex items-center justify-center w-30 disabled:cursor-not-allowed",
                className
            )
        }
        disabled={disabled}
    >
        {children}
    </button>
  )
}