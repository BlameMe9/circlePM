import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { SopPage } from '@/components/general/SopPage';

export const metadata = {
   title: 'SOP | Knowledge Base',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function OrgSopPage(props: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <SopPage />
      </MainLayout>
   );
}
