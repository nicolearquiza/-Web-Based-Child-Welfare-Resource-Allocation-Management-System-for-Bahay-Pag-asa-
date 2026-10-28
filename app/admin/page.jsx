import { Dashboard } from '@/components/Dashboard';
import { requireRole } from '@/lib/auth';
import { getDashboardMetrics } from '@/lib/dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const { user, profile } = await requireRole('admin');
  const metrics = await getDashboardMetrics('admin', user.id);

  return (
    <Dashboard
      fullName={profile.full_name || user.email}
      metrics={metrics}
      role="admin"
    />
  );
}
