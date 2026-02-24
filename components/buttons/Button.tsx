import { cn } from '@/lib/utils'
import { buttonColor } from '@/types/buttonType'
import React from 'react'

export const Button = ({color="primary", type_property = undefined, className, children} : {color: buttonColor, type_property? : "submit" | "reset" | "button" | undefined, className?: string, children: React.ReactNode}) => {  
    return (
    <button 
        type={type_property} 
        className={
            cn(
                className, 
                color=="primary" &&  "bg-brand-primary-300 hover:bg-brand-primary-400",
                color=="secondary" && "bg-brand-secondary-300 hover:bg-brand-secondary-400",
                "rounded-lg px-2 py-1 cursor-pointer shadow-sm min-h-8 flex items-center justify-center w-30"
            )
        }
    >
        {children}
    </button>
  )
}