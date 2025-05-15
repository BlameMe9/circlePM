'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Zap, Plug } from 'lucide-react'; // Assuming Zap for Automations, Plug for Connections
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuButton,
} from '@/components/ui/sidebar';

const integrationItems = [
   { name: 'Automations', path: '/crm/automations', icon: Zap },
   { name: 'Connections', path: '/crm/connections', icon: Plug },
];

export function NavIntegrations() {
   const { orgId } = useParams();
   const base = `/${orgId}`;

   return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
         <SidebarGroupLabel>Integrations</SidebarGroupLabel>
         <SidebarMenu>
            {integrationItems.map((item) => (
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
