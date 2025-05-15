import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmConnectionsPage } from '@/components/crm/CrmConnectionsPage';

export const metadata = {
   title: 'Connections | CRM',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ConnectionsPage(props: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmConnectionsPage />
      </MainLayout>
   );
}
