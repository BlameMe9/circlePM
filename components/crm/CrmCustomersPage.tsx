'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

// Simplified CustomersFilters placeholder
const CustomersFiltersPlaceholder = () => {
   return (
      <div className="border-b p-4">
         <p className="text-sm font-medium">Filters</p>
         <div className="mt-2 space-y-2">
            <input
               type="text"
               placeholder="Search by name, email, or company..."
               className="w-full rounded-md border p-2 text-sm"
            />
            {/* Example: Segment filter placeholder */}
            <select className="w-full rounded-md border p-2 text-sm text-muted-foreground">
               <option value="">All Segments</option>
               <option value="enterprise">Enterprise</option>
               <option value="smb">SMB</option>
               <option value="vip">VIP</option>
            </select>
            <Button variant="outline" size="sm">
               Apply Filters
            </Button>
         </div>
      </div>
   );
};

// Simplified CustomersTable placeholder
const CustomersTablePlaceholder = ({ customersCount }: { customersCount: number }) => {
   return (
      <div className="p-3">
         {customersCount > 0 ? (
            <>
               <p className="text-sm font-medium">Customers Table ({customersCount} customers)</p>
               <div className="mt-2 overflow-x-auto rounded-md border">
                  {/* Basic table structure */}
                  <div className="p-4 text-center text-sm text-muted-foreground">
                     Customer data (e.g., Name, Company, Email, Segment, Last Contact) would be
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

export function CrmCustomersPage() {
   // Mocked data and handlers for structure, initially showing empty state
   const customers: any[] = [];
   const allCustomers: any[] = [];

   const isEmpty = allCustomers.length === 0;
   const currentCustomersCount = customers.length;

   return (
      <div className="flex flex-col gap-4 md:gap-6">
         <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Customer Management</h1>
            <div className="flex items-center gap-2">
               {/* TODO: Update this link path or implement modal for New Customer creation */}
               <Link href="#" passHref>
                  <Button size="sm" asChild>
                     <a>
                        <Plus className="mr-2 size-4" />
                        New Customer
                     </a>
                  </Button>
               </Link>
            </div>
         </div>

         <div className="rounded-lg border bg-background shadow-sm">
            <CustomersFiltersPlaceholder />
            <CustomersTablePlaceholder customersCount={currentCustomersCount} />
         </div>

         {isEmpty && (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center animate-in fade-in-50 shadow-sm">
               <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  {/* Icon suggestion: UsersRound from lucide-react */}
                  <h3 className="mt-4 text-lg font-semibold">No Customers Found</h3>
                  <p className="mb-4 mt-2 text-sm text-muted-foreground">
                     There are currently no customers matching your criteria. Try adjusting filters
                     or adding a new customer.
                  </p>
                  <Link href="#" passHref>
                     <Button asChild>
                        <a>
                           <Plus className="mr-2 size-4" />
                           Add New Customer
                        </a>
                     </Button>
                  </Link>
               </div>
            </div>
         )}
      </div>
   );
}
