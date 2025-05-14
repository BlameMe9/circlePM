import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmLeadsPage } from '@/components/crm/CrmLeadsPage';

export default function OrgCrmLeadsPage({ params }: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmLeadsPage />
      </MainLayout>
   );
}
