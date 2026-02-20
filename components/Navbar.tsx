import Image from 'next/image'
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { cn } from '@/lib/utils'


export default function Navbar() {
  return (
    <div className="row-start-1 row-end-3 bg-gray-100 border-r border-gray-200 flex flex-col items-center gap-10">
        <Link href="/" className="mt-6">
            <Logo/>
        </Link>
        <div className="flex flex-col gap-6">
            <CustomLink href="/" className="shadow-sm rounded-lg text-center px-8 py-2">Home</CustomLink>
            <CustomLink href="/activity">Activity</CustomLink>
        </div>
    </div>
  )
}


export const CustomLink = ({href, className, children} : {href : string, className?: string, children: React.ReactNode}) => {
  return (
    <Link href={href} className={cn(className, "shadow-sm rounded-lg text-center px-8 py-2 bg-brand-primary-300 hover:bg-brand-primary-400")}>{children}</Link>
  )
}


