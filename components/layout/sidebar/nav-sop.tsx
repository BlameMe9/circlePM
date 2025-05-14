'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen } from 'lucide-react'; // Using BookOpen for SOP
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuButton,
} from '@/components/ui/sidebar';

const sopItems = [
   { name: 'SOP', path: '/sop', icon: BookOpen }, // Path will be /orgId/sop
];

export function NavSop() {
   const { orgId } = useParams();
   const base = `/${orgId}`;

   return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
         {/* <SidebarGroupLabel>Knowledge</SidebarGroupLabel> */}
         {/* Decided against a group label for a single item, but can be added if more items come here */}
         <SidebarMenu>
            {sopItems.map((item) => (
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
