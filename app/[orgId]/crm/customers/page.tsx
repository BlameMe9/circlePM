import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmCustomersPage } from '@/components/crm/CrmCustomersPage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function OrgCrmCustomersPage(props: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmCustomersPage />
      </MainLayout>
   );
}
