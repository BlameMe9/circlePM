import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmOverviewPage } from '@/components/crm/CrmOverviewPage';

export default function OrgCrmOverviewPage({ params }: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmOverviewPage />
      </MainLayout>
   );
}
