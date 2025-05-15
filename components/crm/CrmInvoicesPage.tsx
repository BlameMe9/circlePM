'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Invoice } from '../../external-shadcn-crm-dashboard/src/features/dashboard/pages/invoices/types/invoice';

// Simplified InvoicesFilters placeholder
const InvoicesFiltersPlaceholder = () => {
   return (
      <div className="border-b p-4">
         <p className="text-sm font-medium">Filters</p>
         <div className="mt-2 space-y-2">
            <input
               type="text"
               placeholder="Search by invoice #, customer name, or amount..."
               className="w-full rounded-md border p-2 text-sm"
            />
            {/* Example: Status filter placeholder */}
            <select className="w-full rounded-md border p-2 text-sm text-muted-foreground">
               <option value="">All Statuses</option>
               <option value="draft">Draft</option>
               <option value="sent">Sent</option>
               <option value="paid">Paid</option>
               <option value="overdue">Overdue</option>
               <option value="void">Void</option>
            </select>
            <Button variant="outline" size="sm">
               Apply Filters
            </Button>
         </div>
      </div>
   );
};

// Simplified InvoicesTable placeholder
const InvoicesTablePlaceholder = ({ invoicesCount }: { invoicesCount: number }) => {
   return (
      <div className="p-3">
         {invoicesCount > 0 ? (
            <>
               <p className="text-sm font-medium">Invoices Table ({invoicesCount} invoices)</p>
               <div className="mt-2 overflow-x-auto rounded-md border">
                  {/* Basic table structure */}
                  <div className="p-4 text-center text-sm text-muted-foreground">
                     Invoice data (e.g., Invoice #, Customer, Amount, Status, Due Date) would be
                     displayed here.
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
         ) : null}
      </div>
   );
};

export function CrmInvoicesPage() {
   // Mocked data and handlers for structure, initially showing empty state
   const invoices: Invoice[] = [];
   const allInvoices: Invoice[] = [];

   const isEmpty = allInvoices.length === 0;
   const currentInvoicesCount = invoices.length;

   return (
      <div className="flex flex-col gap-4 md:gap-6">
         <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Invoice Management</h1>
            <div className="flex items-center gap-2">
               {/* TODO: Update this link path or implement modal for New Invoice creation */}
               <Link href="#" passHref>
                  <Button size="sm" asChild>
                     <a>
                        <Plus className="mr-2 size-4" />
                        New Invoice
                     </a>
                  </Button>
               </Link>
            </div>
         </div>

         <div className="rounded-lg border bg-background shadow-sm">
            <InvoicesFiltersPlaceholder />
            <InvoicesTablePlaceholder invoicesCount={currentInvoicesCount} />
         </div>

         {isEmpty && (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center animate-in fade-in-50 shadow-sm">
               <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  {/* Icon suggestion: FileText from lucide-react */}
                  <h3 className="mt-4 text-lg font-semibold">No Invoices Found</h3>
                  <p className="mb-4 mt-2 text-sm text-muted-foreground">
                     There are currently no invoices matching your criteria. Try adjusting filters
                     or creating a new invoice.
                  </p>
                  <Link href="#" passHref>
                     <Button asChild>
                        <a>
                           <Plus className="mr-2 size-4" />
                           Create New Invoice
                        </a>
                     </Button>
                  </Link>
               </div>
            </div>
         )}
      </div>
   );
}
