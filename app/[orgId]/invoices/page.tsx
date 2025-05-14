import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmInvoicesPage } from '@/components/crm/CrmInvoicesPage';

export default function OrgInvoicesPage({ params }: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmInvoicesPage />
      </MainLayout>
   );
}
