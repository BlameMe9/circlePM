'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SopPage() {
   return (
      <div className="flex flex-col gap-5">
         <div className="grid gap-4 md:grid-cols-1">
            <Card>
               <CardHeader>
                  <CardTitle>Standard Operating Procedures (SOP)</CardTitle>
                  <CardDescription>Access and manage your team's SOPs.</CardDescription>
               </CardHeader>
               <CardContent>
                  <p className="text-muted-foreground">
                     This page is currently under construction. SOP content will be available here
                     soon.
                  </p>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
