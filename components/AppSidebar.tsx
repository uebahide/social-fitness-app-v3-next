'use client';

import * as React from 'react';
import { MailIcon, SearchIcon, UsersIcon } from 'lucide-react';

import { NavMain } from '@/components/NavMain';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import RunIcon from './icons/Run';
import HomeIcon from './icons/Home';
import { NavUser } from './NavUser';
import { useUser } from '@/contexts/UserProvider';

const data = [
  {
    name: 'Home',
    url: '/',
    icon: <HomeIcon />,
  },
  {
    name: 'My Activity',
    url: '/activity',
    icon: <RunIcon />,
  },
  {
    name: 'Friends',
    url: '#',
    icon: <UsersIcon />,
    isActive: true,
    items: [
      {
        name: 'Friend list',
        url: '/friends/list',
        icon: <UsersIcon />,
      },
      {
        name: 'Friend requests',
        url: '/friends/requests',
        icon: <MailIcon />,
      },
      {
        name: 'Search friends',
        url: '/friends/search',
        icon: <SearchIcon />,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
