import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { SopPage } from '@/components/general/SopPage';

export const metadata = {
   title: 'SOP | Knowledge Base',
};

export default function OrgSopPage({ params }: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <SopPage />
      </MainLayout>
   );
}
