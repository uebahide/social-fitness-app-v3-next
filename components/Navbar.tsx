import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import HomeIcon from './icons/Home';
import RunIcon from './icons/Run';

export default function Navbar() {
  return (
    <div className="row-start-1 row-end-3 flex flex-col items-center gap-10 border-r border-gray-200 px-5">
      <Link href="/" className="mt-6">
        <Logo />
      </Link>
      <div className="flex w-full flex-col gap-3">
        <CustomLink href="/">
          <HomeIcon className="h-5 w-5" /> Home
        </CustomLink>
        <CustomLink href="/activity">
          <RunIcon className="h-5 w-5" />
          My Activity
        </CustomLink>
      </div>
    </div>
  );
}

export const CustomLink = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        className,
        'flex items-center justify-start gap-2 rounded-sm py-1 pr-8 pl-3 hover:bg-gray-200 active:bg-gray-200',
      )}
    >
      {children}
    </Link>
  );
};
