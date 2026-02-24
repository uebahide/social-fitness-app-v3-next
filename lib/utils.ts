import { clsx } from "clsx"
import { cookies } from "next/headers"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

// export async function auth(){
//   const cookiesStore = await cookies()
//   const token = cookiesStore.get('token')

//   let res: Response

//   try{
//     res = await fetch(`${process.env.API_URL}/api/me`, {
//       headers : {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       }
//     })
//   }catch(e){
//     throw new Error(`Network error while fetching user info: ${String(e)}`);
//   }

//   if(!res.ok){
//     return null
//   }

//   const resJson = await res.json()
//   return resJson.user
// }