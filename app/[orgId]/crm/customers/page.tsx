import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmCustomersPage } from '@/components/crm/CrmCustomersPage';

export default function OrgCrmCustomersPage({ params }: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmCustomersPage />
      </MainLayout>
   );
}
