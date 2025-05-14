import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmConnectionsPage } from '@/components/crm/CrmConnectionsPage';

export const metadata = {
   title: 'Connections | CRM',
};

export default function ConnectionsPage({ params }: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmConnectionsPage />
      </MainLayout>
   );
}
