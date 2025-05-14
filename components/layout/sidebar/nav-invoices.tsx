'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FileText } from 'lucide-react';
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuButton,
} from '@/components/ui/sidebar';

export function NavInvoices() {
   const { orgId } = useParams();
   return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
         <SidebarGroupLabel>Invoices</SidebarGroupLabel>
         <SidebarMenu>
            <SidebarMenuItem>
               <SidebarMenuButton asChild>
                  <Link href={`/${orgId}/invoices`}>
                     <FileText className="size-4" />
                     <span>Invoices</span>
                  </Link>
               </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarGroup>
   );
}
