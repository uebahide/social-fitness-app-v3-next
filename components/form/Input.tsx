import { HTMLInputTypeAttribute } from "react"

export const Input = ({defaultValue, id, name, type="text", required} : {defaultValue:string,id:string, name: string, type: HTMLInputTypeAttribute | undefined, required: boolean}) => {
    return (
        <input 
            defaultValue={defaultValue} 
            type={type} 
            id={id} 
            name={name} 
            className="border-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none h-8" 
            required={required}
        />
    )
}
