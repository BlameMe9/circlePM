'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { UserRound, FileText } from 'lucide-react'; // Removed ContactRound as 'Teams' link is moved

const topGroupItems = [
   {
      name: 'Members',
      url: '/lndev-ui/members', // Assuming this is the correct path from workspaceItems
      icon: UserRound,
   },
   {
      name: 'Activity Logs',
      url: '/crm/activity-logs', // Path from crmItems
      icon: FileText,
   },
];

export function NavTopGroup() {
   const { orgId } = useParams(); // Assuming orgId might be needed for full paths
   const base = `/${orgId}`;

   return (
      <SidebarMenu className="pt-2 pb-2 border-b border-border">
         {topGroupItems.map((item) => (
            <SidebarMenuItem key={item.name}>
               <SidebarMenuButton asChild>
                  {/* Adjust href if base path is needed, e.g., for CRM links */}
                  <Link href={item.url.startsWith('/') ? `${base}${item.url}` : item.url}>
                     <item.icon className="size-4" />
                     <span>{item.name}</span>
                  </Link>
               </SidebarMenuButton>
            </SidebarMenuItem>
         ))}
      </SidebarMenu>
   );
}
