import { redirect } from 'next/navigation';

export default function DashboardPage() {
   // Redirect to the main application view, which appears to be the task management interface.
   // The specific path '/lndev-ui/team/CORE/all' is derived from the redirect in `app/page.tsx`.
   // This ensures that accessing /dashboard lands the user on the intended main UI.
   redirect('/lndev-ui/team/CORE/all');

   // This component will not render anything as redirect() is called.
   // return null; // Or an empty fragment, though typically redirect handles it.
}
