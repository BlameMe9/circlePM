'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CrmAutomationsPage() {
   return (
      <div className="flex flex-col gap-5">
         <div className="grid gap-4 md:grid-cols-1">
            <Card>
               <CardHeader>
                  <CardTitle>Automations</CardTitle>
                  <CardDescription>Create and manage your CRM automations</CardDescription>
               </CardHeader>
               <CardContent>
                  <p className="text-muted-foreground">
                     This feature is coming soon. Stay tuned for updates!
                  </p>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
