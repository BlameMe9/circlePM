'use client';

'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuButton,
} from '@/components/ui/sidebar';
import { workspaceItems as allWorkspaceItems } from '@/mock-data/side-bar-nav';
import { BookOpen, Box, CopyMinus, ContactRound } from 'lucide-react'; // Added ContactRound for 'Teams' link

export function NavTeams() {
   const params = useParams();
   const orgId = params.orgId as string;
   const projectItem = allWorkspaceItems.find((item) => item.name === 'Projects');
   return (
      <SidebarGroup>
         <SidebarGroupLabel>Projects</SidebarGroupLabel>
         <SidebarMenu>
            {/* General Workspace Items First */}
            {projectItem && (
               <SidebarMenuItem key={projectItem.name}>
                  <SidebarMenuButton asChild>
                     <Link href={projectItem.url}>
                        <Box className="size-4" />
                        <span>{projectItem.name}</span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            )}
            {/* Tasks Link - Ensure this is present and correctly ordered */}
            <SidebarMenuItem>
               <SidebarMenuButton asChild>
                  <Link href={`/${orgId}/all-tasks`}>
                     <CopyMinus className="size-4" />
                     <span>Tasks</span>
                  </Link>
               </SidebarMenuButton>
            </SidebarMenuItem>
            {/* Teams Link (Moved from NavTopGroup) - Ensure this is present and correctly ordered */}
            <SidebarMenuItem>
               <SidebarMenuButton asChild>
                  {/* The path for 'Teams' does not seem to require orgId based on original */}
                  <Link href="/lndev-ui/teams">
                     <ContactRound className="size-4" />
                     <span>Teams</span>
                  </Link>
               </SidebarMenuButton>
            </SidebarMenuItem>
            {/* SOP Link */}
            <SidebarMenuItem>
               <SidebarMenuButton asChild>
                  <Link href={`/${orgId}/sop`}>
                     <BookOpen className="size-4" />
                     <span>SOP</span>
                  </Link>
               </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarGroup>
   );
}
