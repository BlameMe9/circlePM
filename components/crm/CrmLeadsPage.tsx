'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Lead } from '../../external-shadcn-crm-dashboard/src/features/dashboard/pages/leads/types/lead';

// Simplified LeadsFilters placeholder
const LeadsFiltersPlaceholder = () => {
   return (
      <div className="border-b p-4">
         <p className="text-sm font-medium">Filters</p>
         <div className="mt-2 space-y-2">
            <input
               type="text"
               placeholder="Search by name, email, or company..."
               className="w-full rounded-md border p-2 text-sm"
            />
            {/* Example: Status filter placeholder */}
            <select className="w-full rounded-md border p-2 text-sm text-muted-foreground">
               <option value="">All Statuses</option>
               <option value="new">New</option>
               <option value="contacted">Contacted</option>
               <option value="qualified">Qualified</option>
               <option value="lost">Lost</option>
            </select>
            <Button variant="outline" size="sm">
               Apply Filters
            </Button>
         </div>
      </div>
   );
};

// Simplified LeadsTable placeholder
const LeadsTablePlaceholder = ({ leadsCount }: { leadsCount: number }) => {
   return (
      <div className="p-3">
         {leadsCount > 0 ? (
            <>
               <p className="text-sm font-medium">Leads Table ({leadsCount} leads)</p>
               <div className="mt-2 overflow-x-auto rounded-md border">
                  {/* Basic table structure could go here */}
                  <div className="p-4 text-center text-sm text-muted-foreground">
                     Lead data (e.g., Name, Company, Email, Status, Source) would be displayed here
                     in a table format.
                  </div>
               </div>
               {/* Pagination placeholder */}
               <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" size="sm" disabled>
                     Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">Page 1 of 1</span>
                  <Button variant="outline" size="sm" disabled>
                     Next
                  </Button>
               </div>
            </>
         ) : null}{' '}
         {/* Don't show table placeholder if isEmpty is true and handled by the main empty state */}
      </div>
   );
};

export function CrmLeadsPage() {
   // Mocked data and handlers for structure, initially showing empty state
   const leads: Lead[] = [];
   const allLeads: Lead[] = [];
   // const pageCount = 0;
   // const filters = {};
   // const sorting = {};
   // const pagination = { pageIndex: 0, pageSize: 10 };

   // const updateFilters = () => console.log("Update filters clicked");
   // const handleSortingChange = () => console.log("Sort change clicked");
   // const handlePaginationChange = () => console.log("Pagination change clicked");
   // const handleClearFilters = () => console.log("Clear filters clicked (from empty state)");

   const isEmpty = allLeads.length === 0;
   const currentLeadsCount = leads.length;

   return (
      <div className="flex flex-col gap-4 md:gap-6">
         <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Leads Management</h1>
            <div className="flex items-center gap-2">
               {/* TODO: Update this link path or implement modal for New Lead creation */}
               <Link href="#" passHref>
                  <Button size="sm" asChild>
                     <a>
                        {' '}
                        {/* Ensure Button works correctly with Link in Next.js 13+ App Router */}
                        <Plus className="mr-2 size-4" />
                        New Lead
                     </a>
                  </Button>
               </Link>
            </div>
         </div>

         <div className="rounded-lg border bg-background shadow-sm">
            <LeadsFiltersPlaceholder />
            <LeadsTablePlaceholder leadsCount={currentLeadsCount} />
         </div>

         {isEmpty && (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center animate-in fade-in-50 shadow-sm">
               <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  {/* You could add an icon from lucide-react here, e.g., Users2 or FilterX */}
                  <h3 className="mt-4 text-lg font-semibold">No Leads Found</h3>
                  <p className="mb-4 mt-2 text-sm text-muted-foreground">
                     There are currently no leads matching your criteria. Try adjusting filters or
                     creating a new lead.
                  </p>
                  <Link href="#" passHref>
                     <Button asChild>
                        <a>
                           <Plus className="mr-2 size-4" />
                           Create New Lead
                        </a>
                     </Button>
                  </Link>
               </div>
            </div>
         )}
      </div>
   );
}
