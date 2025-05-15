import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmOverviewPage } from '@/components/crm/CrmOverviewPage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function OrgCrmOverviewPage(props: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmOverviewPage />
      </MainLayout>
   );
}
