import { Dashboard } from '@/components/Dashboard';
import { requireRole } from '@/lib/auth';
import { getDashboardMetrics } from '@/lib/dashboard';

export const dynamic = 'force-dynamic';

export default async function StaffDashboardPage() {
  const { user, profile } = await requireRole('staff');
  const metrics = await getDashboardMetrics('staff', user.id);

  return (
    <Dashboard
      fullName={profile.full_name || user.email}
      metrics={metrics}
      role="staff"
    />
  );
}
