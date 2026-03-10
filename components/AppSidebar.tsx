'use client';

import * as React from 'react';
import { MailIcon, SearchIcon, UsersIcon } from 'lucide-react';

import { Nav } from '@/components/Nav';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import RunIcon from './icons/Run';
import HomeIcon from './icons/Home';
import { NavUser } from './nav-user';

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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <Nav items={data} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
