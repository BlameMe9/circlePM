import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export default function MyTasksPage() {
   return (
      <div className="flex h-full flex-col items-center justify-center bg-background p-6">
         <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-muted p-4">
               <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">No tasks assigned to you</h2>
            <p className="text-sm text-muted-foreground">Get started by creating a new task.</p>
            <Button>Create New Task</Button>
         </div>
      </div>
   );
}
