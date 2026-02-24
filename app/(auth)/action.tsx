'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import z from "zod"


const  schema = z.object({
    name : z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "This field should be same value as password",
  path : ['password_confirmation']
})
 
export async function register(prevState: any, formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  const data = {
    name : String(formData.get("name") ?? ""),
    email : String(formData.get("email") ?? ""),
    password : String(formData.get("password") ?? ""),
    password_confirmation : String(formData.get("password_confirmation") ?? "")
  }

  const validatedFields = schema.safeParse(data)

  if(!validatedFields.success){
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "",
        data
    }
  }

  let res: Response;

  try{
      res = await fetch(`${process.env.API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name, email, password
        })
      });
  }catch(e){
    throw new Error(`Network error while registering new user: ${String(e)}`);  
  }

  const resJson = await res.json()

  if(!res.ok){
    return {
      errors: resJson.errors,
      message: resJson.message,
      data
    }
  }

  const bearerToken = resJson.token
  const cookiesStore = await cookies()
  cookiesStore.set('token', bearerToken, {
    httpOnly: true
  })

  redirect('/')
}

export async function login(prevState: any, formData: FormData){
  const email = formData.get('email')
  const password = formData.get('password')

  let res: Response
  
  try{
    res = await fetch(`${process.env.API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })
  }catch(e){
    throw new Error(`Network error while loging in: ${String(e)}`);  
  }

  const resJson = await res.json()
  
  if(!res.ok){
    console.log("response: ", res)
    return {
      error: resJson.error,
      data : {email, password}
    }
  }

  const bearerToken = resJson.token
  const cookiesStore = await cookies()
  cookiesStore.set('token', bearerToken, {
    httpOnly: true
  })

  redirect('/')
}

export async function logout(prevState: any, formData: FormData){
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value;
  let res:Response
  
  try{
    res = await fetch(`${process.env.API_URL}/api/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
  }catch(e){
    throw new Error(`Network error while logout : ${String(e)}`);  
  }

  console.log(res)

  redirect('/')
}