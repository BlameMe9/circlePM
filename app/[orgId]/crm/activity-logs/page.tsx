import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/headers/issues/header';
import { CrmActivityLogsPage } from '@/components/crm/CrmActivityLogsPage';

export const metadata = {
   title: 'Activity Logs | CRM',
};

export default function ActivityLogsPage({ params }: { params: { orgId: string } }) {
   return (
      <MainLayout header={<Header />}>
         <CrmActivityLogsPage />
      </MainLayout>
   );
}
