import React from 'react'

export const FormRow = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}