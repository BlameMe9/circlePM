'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CrmConnectionsPage() {
   return (
      <div className="flex flex-col gap-5">
         <div className="grid gap-4 md:grid-cols-1">
            <Card>
               <CardHeader>
                  <CardTitle>Connections</CardTitle>
                  <CardDescription>Integrate your CRM with external services</CardDescription>
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
