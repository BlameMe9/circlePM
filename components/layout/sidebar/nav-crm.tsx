'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FileText, Users, List } from 'lucide-react';
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuButton,
} from '@/components/ui/sidebar';

const crmItems = [
   { name: 'Overview', path: '/crm/overview', icon: List },
   { name: 'Activity Logs', path: '/crm/activity-logs', icon: FileText },
   { name: 'Companies', path: '/crm/leads', icon: FileText },
   { name: 'Customers', path: '/crm/customers', icon: Users },
   { name: 'Automations', path: '/crm/automations', icon: FileText },
   { name: 'Connections', path: '/crm/connections', icon: FileText },
];

export function NavCrm() {
   const { orgId } = useParams();
   const base = `/${orgId}`;

   return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
         <SidebarGroupLabel>CRM</SidebarGroupLabel>
         <SidebarMenu>
            {crmItems.map((item) => (
               <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                     <Link href={`${base}${item.path}`}>
                        <item.icon className="size-4" />
                        <span>{item.name}</span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
         </SidebarMenu>
      </SidebarGroup>
   );
}
