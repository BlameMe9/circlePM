import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmAutomationsPage } from '@/components/crm/CrmAutomationsPage';

export const metadata = {
   title: 'Automations | CRM',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AutomationsPage(props: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmAutomationsPage />
      </MainLayout>
   );
}
