import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmAutomationsPage } from '@/components/crm/CrmAutomationsPage';

export const metadata = {
   title: 'Automations | CRM',
};

export default function AutomationsPage({ params }: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmAutomationsPage />
      </MainLayout>
   );
}
