'use client';

import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useViewStore, ViewType } from '@/store/view-store';
import { useCreateIssueStore } from '@/store/create-issue-store';
import { LayoutGrid, LayoutList } from 'lucide-react'; // Removed SlidersHorizontal
import { Filter } from './filter';

export default function HeaderOptions() {
   const { viewType, setViewType } = useViewStore();
   const { openModal } = useCreateIssueStore();

   const handleViewChange = (type: ViewType) => {
      setViewType(type);
   };

   return (
      <div className="w-full flex justify-between items-center border-b py-1.5 px-6 h-10">
         <Filter />
         <div className="flex items-center gap-2">
            <Button size="xs" variant="default" onClick={() => openModal()}>
               New Task
            </Button>
            <Button
               size="xs"
               variant="secondary"
               onClick={() => setViewType(viewType === 'grid' ? 'list' : 'grid')}
            >
               {viewType === 'grid' ? (
                  <LayoutList className="size-4 mr-1" />
               ) : (
                  <LayoutGrid className="size-4 mr-1" />
               )}
               {viewType === 'grid' ? 'List View' : 'Board View'}
            </Button>
         </div>
      </div>
   );
}
