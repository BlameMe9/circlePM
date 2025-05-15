import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmLeadsPage } from '@/components/crm/CrmLeadsPage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function OrgCrmLeadsPage(props: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmLeadsPage />
      </MainLayout>
   );
}
