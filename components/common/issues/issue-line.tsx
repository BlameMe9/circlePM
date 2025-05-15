'use client';

import { useState } from 'react';
import { Issue } from '@/mock-data/issues';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { format } from 'date-fns';
import { AssigneeUser } from './assignee-user';
import { LabelBadge } from './label-badge';
import { PrioritySelector } from './priority-selector';
import { ProjectBadge } from './project-badge';
import { StatusSelector } from './status-selector';
import { motion } from 'motion/react';

import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';
import { IssueContextMenu } from './issue-context-menu';
import { IssueDialogSidebar } from './issue-dialog-sidebar';

export function IssueLine({ issue, layoutId = false }: { issue: Issue; layoutId?: boolean }) {
   const [isEditorOpen, setIsEditorOpen] = useState(false);
   return (
      <>
         <ContextMenu>
            <ContextMenuTrigger asChild>
               <motion.div
                  onClick={() => setIsEditorOpen(true)}
                  {...(layoutId && { layoutId: `issue-line-${issue.identifier}` })}
                  //href={`/lndev-ui/issue/${issue.identifier}`}
                  className="w-full flex items-center justify-start h-11 px-6 hover:bg-sidebar/50 cursor-pointer"
               >
                  <div className="flex items-center gap-0.5">
                     <PrioritySelector priority={issue.priority} issueId={issue.id} />
                     <span className="text-sm hidden sm:inline-block text-muted-foreground font-medium w-[66px] truncate shrink-0 mr-0.5">
                        {issue.identifier}
                     </span>
                     <StatusSelector status={issue.status} issueId={issue.id} />
                  </div>
                  <span className="min-w-0 flex items-center justify-start mr-1 ml-0.5">
                     <span className="text-xs sm:text-sm font-medium sm:font-semibold truncate">
                        {issue.title}
                     </span>
                  </span>
                  <div className="flex items-center justify-end gap-2 ml-auto sm:w-fit">
                     <div className="w-3 shrink-0"></div>
                     <div className="-space-x-5 hover:space-x-1 lg:space-x-1 items-center justify-end hidden sm:flex duration-200 transition-all">
                        <LabelBadge label={issue.labels} />
                        {issue.project && <ProjectBadge project={issue.project} />}
                     </div>
                     <span className="text-xs text-muted-foreground shrink-0 hidden sm:inline-block">
                        {format(new Date(issue.createdAt), 'MMM dd')}
                     </span>
                     <AssigneeUser user={issue.assignee} />
                  </div>
               </motion.div>
            </ContextMenuTrigger>
            <IssueContextMenu issueId={issue.id} />
         </ContextMenu>
         <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
            <DialogContent
               className={cn(
                  'flex flex-row p-0', // Remove padding from DialogContent itself
                  'h-[85vh] max-h-[85vh] w-[95vw] max-w-[1800px]'
               )}
            >
               {/* Main Content Column (Editor + Header) */}
               <div className="flex flex-grow flex-col overflow-hidden">
                  <DialogHeader className="pl-6 pr-6 pt-4 pb-2 border-b shrink-0">
                     {' '}
                     {/* Header for the editor section */}
                     <DialogTitle className="flex-grow truncate">{issue.title}</DialogTitle>
                     {/* You can add other header controls here if needed, e.g., close button, fullscreen toggle */}
                  </DialogHeader>
                  <div className="flex-grow overflow-auto p-4 md:p-6">
                     {' '}
                     {/* Editor content area */}
                     <SimpleEditor />
                  </div>
               </div>

               {/* Sidebar Column */}
               <IssueDialogSidebar issue={issue} />
            </DialogContent>
         </Dialog>
      </>
   );
}
