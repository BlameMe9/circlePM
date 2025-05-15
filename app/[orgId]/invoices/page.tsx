import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmInvoicesPage } from '@/components/crm/CrmInvoicesPage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function OrgInvoicesPage(props: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmInvoicesPage />
      </MainLayout>
   );
}
