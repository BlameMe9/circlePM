'use client';

// import { status } from '@/mock-data/status'; // Will now come from useIssuesStore
import { useIssuesStore } from '@/store/issues-store';
import { useSearchStore } from '@/store/search-store';
import { useViewStore } from '@/store/view-store';
import { useFilterStore } from '@/store/filter-store';
import { FC, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GroupIssues } from './group-issues';
import { SearchIssues } from './search-issues';
import { CustomDragLayer } from './issue-grid';
import { cn } from '@/lib/utils';
import { Issue } from '@/mock-data/issues';

import { Status } from '@/mock-data/status'; // Import Status type

export default function AllIssues() {
   const { isSearchOpen, searchQuery } = useSearchStore();
   const { viewType } = useViewStore();
   const { hasActiveFilters } = useFilterStore();
   const { statuses } = useIssuesStore(); // Get statuses from the store

   const isSearching = isSearchOpen && searchQuery.trim() !== '';
   const isViewTypeGrid = viewType === 'grid';
   const isFiltering = hasActiveFilters();

   return (
      <div className={cn('w-full h-full', isViewTypeGrid && 'overflow-x-auto')}>
         {isSearching ? (
            <SearchIssuesView />
         ) : isFiltering ? (
            <FilteredIssuesView statuses={statuses} isViewTypeGrid={isViewTypeGrid} />
         ) : (
            <GroupIssuesListView statuses={statuses} isViewTypeGrid={isViewTypeGrid} />
         )}
      </div>
   );
}

const SearchIssuesView = () => (
   <div className="px-6 mb-6">
      <SearchIssues />
   </div>
);

const FilteredIssuesView: FC<{
   statuses: Status[];
   isViewTypeGrid: boolean;
}> = ({ statuses, isViewTypeGrid = false }) => {
   const { filters } = useFilterStore();
   const { filterIssues } = useIssuesStore();

   // Apply filters to get filtered issues
   const filteredIssues = useMemo(() => {
      return filterIssues(filters);
   }, [filterIssues, filters]);

   // Group filtered issues by status
   const filteredIssuesByStatus = useMemo(() => {
      const result: Record<string, Issue[]> = {};

      statuses.forEach((statusItem) => {
         // Use statuses from props
         result[statusItem.id] = filteredIssues.filter(
            (issue) => issue.status.id === statusItem.id
         );
      });

      return result;
   }, [filteredIssues, statuses]); // Add statuses to dependency array

   return (
      <DndProvider backend={HTML5Backend}>
         <CustomDragLayer />
         <div className={cn(isViewTypeGrid && 'flex h-full gap-6 px-2 py-2 min-w-max')}>
            {statuses.map((statusItem: Status) => (
               <GroupIssues
                  key={statusItem.id}
                  status={statusItem}
                  issues={filteredIssuesByStatus[statusItem.id] || []}
                  count={filteredIssuesByStatus[statusItem.id]?.length || 0}
               />
            ))}
         </div>
      </DndProvider>
   );
};

const GroupIssuesListView: FC<{
   statuses: Status[];
   isViewTypeGrid: boolean;
}> = ({ statuses, isViewTypeGrid = false }) => {
   const { issuesByStatus } = useIssuesStore();
   return (
      <DndProvider backend={HTML5Backend}>
         <CustomDragLayer />
         <div className={cn(isViewTypeGrid && 'flex h-full gap-6 px-2 py-2 min-w-max')}>
            {statuses.map((statusItem: Status) => (
               <GroupIssues
                  key={statusItem.id}
                  status={statusItem}
                  issues={issuesByStatus[statusItem.id] || []}
                  count={issuesByStatus[statusItem.id]?.length || 0}
               />
            ))}
         </div>
      </DndProvider>
   );
};
