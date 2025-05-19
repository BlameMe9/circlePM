'use client';

import { Issue } from '@/mock-data/issues';
import { Status } from '@/mock-data/status';
import { useIssuesStore } from '@/store/issues-store';
import { useViewStore } from '@/store/view-store';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { FC, useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IssueDragType, IssueGrid } from './issue-grid';
import { IssueLine } from './issue-line';
import { useCreateIssueStore } from '@/store/create-issue-store';
import { sortIssuesByPriority } from '@/mock-data/issues';
import { AnimatePresence, motion } from 'motion/react';

interface GroupIssuesProps {
   status: Status;
   issues: Issue[];
   count: number;
}

export function GroupIssues({ status, issues, count }: GroupIssuesProps) {
   const { viewType } = useViewStore();
   const { openModal } = useCreateIssueStore();
   const { updateStatusName } = useIssuesStore();
   const isViewTypeGrid = viewType === 'grid';

   const [isEditing, setIsEditing] = useState(false);
   const [currentName, setCurrentName] = useState(status.name);
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      if (isEditing && inputRef.current) {
         inputRef.current.focus();
         inputRef.current.select();
      }
   }, [isEditing]);

   useEffect(() => {
      if (!isEditing) {
         setCurrentName(status.name);
      }
   }, [status.name, isEditing]);

   const handleNameClick = () => {
      setIsEditing(true);
   };

   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentName(event.target.value);
   };

   const saveName = () => {
      const trimmedName = currentName.trim();
      if (trimmedName && trimmedName !== status.name) {
         updateStatusName(status.id, trimmedName);
      }
      setIsEditing(false);
   };

   const handleNameBlur = () => {
      saveName();
   };

   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         saveName();
      }
      if (event.key === 'Escape') {
         setCurrentName(status.name); // Reset to original name
         setIsEditing(false);
      }
   };
   const sortedIssues = sortIssuesByPriority(issues);

   return (
      <div
         className={cn(
            'bg-container', // Corrected typo
            isViewTypeGrid
               ? 'overflow-hidden rounded-md h-full flex-shrink-0 w-[348px] flex flex-col mt-4'
               : 'mt-6' // Added margin-top for list view
         )}
      >
         <div
            className={cn(
               'sticky top-0 z-10 bg-container w-full',
               isViewTypeGrid ? 'rounded-t-md h-[50px]' : 'h-10'
            )}
         >
            <div
               className={cn(
                  'w-full h-full flex items-center justify-between',
                  isViewTypeGrid ? 'px-3' : 'px-6'
               )}
               style={{
                  backgroundColor: isViewTypeGrid ? `${status.color}10` : `${status.color}08`,
               }}
            >
               <div className="flex items-center gap-2">
                  <status.icon />
                  {isEditing ? (
                     <Input
                        ref={inputRef}
                        type="text"
                        value={currentName}
                        onChange={handleNameChange}
                        onBlur={handleNameBlur}
                        onKeyDown={handleKeyDown}
                        className="h-7 px-1 text-sm font-medium bg-transparent border-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 min-w-0 flex-grow w-auto"
                        style={{ flexBasis: 'auto' }} // Allow shrinking and growing
                     />
                  ) : (
                     <span className="text-sm font-medium cursor-text" onClick={handleNameClick}>
                        {status.name}
                     </span>
                  )}
                  <span className="text-sm text-muted-foreground">{count}</span>
               </div>

               <Button
                  className="size-6"
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                     e.stopPropagation();
                     openModal(status);
                  }}
               >
                  <Plus className="size-4" />
               </Button>
            </div>
         </div>

         {viewType === 'list' ? (
            <div className="space-y-0">
               {sortedIssues.map((issue) => (
                  <IssueLine key={issue.id} issue={issue} layoutId={true} />
               ))}
            </div>
         ) : (
            <IssueGridList issues={issues} status={status} />
         )}
      </div>
   );
}

const IssueGridList: FC<{ issues: Issue[]; status: Status }> = ({ issues, status }) => {
   const ref = useRef<HTMLDivElement>(null);
   const { updateIssueStatus } = useIssuesStore();

   // Set up drop functionality to accept only issue items.
   const [{ isOver }, drop] = useDrop(() => ({
      accept: IssueDragType,
      drop(item: Issue, monitor) {
         if (monitor.didDrop() && item.status.id !== status.id) {
            updateIssueStatus(item.id, status);
         }
      },
      collect: (monitor) => ({
         isOver: !!monitor.isOver(),
      }),
   }));
   drop(ref);

   const sortedIssues = sortIssuesByPriority(issues);

   return (
      <div
         ref={ref}
         className="flex-1 h-full overflow-y-auto p-2 space-y-2 bg-zinc-50/50 dark:bg-zinc-900/50 relative"
      >
         <AnimatePresence>
            {isOver && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center pointer-events-none bg-background/90"
                  style={{
                     width: ref.current?.getBoundingClientRect().width || '100%',
                     height: ref.current?.getBoundingClientRect().height || '100%',
                     transform: `translate(${ref.current?.getBoundingClientRect().left || 0}px, ${ref.current?.getBoundingClientRect().top || 0}px)`,
                  }}
               >
                  <div className="bg-background border border-border rounded-md p-3 shadow-md max-w-[90%]">
                     <p className="text-sm font-medium text-center">Board ordered by priority</p>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
         {sortedIssues.map((issue) => (
            <IssueGrid key={issue.id} issue={issue} />
         ))}
      </div>
   );
};
