'use client';

import { Issue } from '@/mock-data/issues';
import { StatusSelector } from './status-selector';
import { PrioritySelector } from './priority-selector';
import { AssigneeUser } from './assignee-user';
import { LabelBadge } from './label-badge';
import { ProjectBadge } from './project-badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
   TagIcon,
   LayoutGridIcon,
   UserCircleIcon,
   BarChartIcon,
   CheckCircleIcon,
} from 'lucide-react'; // Or other appropriate icons

interface IssueDialogSidebarProps {
   issue: Issue;
}

export function IssueDialogSidebar({ issue }: IssueDialogSidebarProps) {
   return (
      <div className="w-64 shrink-0 border-l p-4 space-y-6 bg-muted/30 h-full overflow-y-auto">
         <h3 className="text-lg font-semibold text-foreground">Properties</h3>

         <div>
            <div className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
               <CheckCircleIcon className="mr-2 h-4 w-4" />
               Status
            </div>
            <StatusSelector status={issue.status} issueId={issue.id} />
         </div>

         <Separator />

         <div>
            <div className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
               <BarChartIcon className="mr-2 h-4 w-4" />
               Priority
            </div>
            <PrioritySelector priority={issue.priority} issueId={issue.id} />
         </div>

         <Separator />

         <div>
            <div className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
               <UserCircleIcon className="mr-2 h-4 w-4" />
               Assignee
            </div>
            <AssigneeUser user={issue.assignee} />
            {/* TODO: Add Assignee Selector/Button here if needed */}
         </div>

         <Separator />

         <div>
            <div className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
               <TagIcon className="mr-2 h-4 w-4" />
               Labels
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
               <LabelBadge label={issue.labels} />
            </div>
            <Button variant="outline" size="sm" className="w-full">
               Add label
            </Button>
         </div>

         <Separator />

         <div>
            <div className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
               <LayoutGridIcon className="mr-2 h-4 w-4" />
               Project
            </div>
            {issue.project && <ProjectBadge project={issue.project} />}
            <Button variant="outline" size="sm" className="w-full mt-2">
               Add to project
            </Button>
         </div>
      </div>
   );
}
