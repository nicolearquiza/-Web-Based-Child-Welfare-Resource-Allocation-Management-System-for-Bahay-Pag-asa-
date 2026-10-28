import Link from 'next/link';
import { logoutAction } from '@/app/actions';

export function Dashboard({ role, fullName, metrics }) {
  const isAdmin = role === 'admin';
  const cards = isAdmin
    ? [
        { label: 'Active children', value: metrics.children },
        { label: 'Donation records this month', value: metrics.donations },
        { label: 'Resources', value: metrics.resources },
        { label: 'Partners', value: metrics.partners },
      ]
    : [
        { label: 'Active children', value: metrics.children },
        { label: 'My donation records', value: metrics.donations },
        { label: 'Case updates', value: metrics.caseUpdates },
      ];

  return (
    <main className="dashboard-page">
      <header className="topbar">
        <Link className="brand-link" href={isAdmin ? '/admin' : '/staff'}>
          Bahay Pag-asa
        </Link>
        <div className="account-actions">
          <span>{fullName}</span>
          <form action={logoutAction}>
            <button className="button button-outline" type="submit">Sign out</button>
          </form>
        </div>
      </header>
      <section className="dashboard-content">
        <div className="dashboard-heading">
          <div>
            <p className="eyebrow">Child Welfare Resource Allocation</p>
            <h1>{isAdmin ? 'Administrator dashboard' : 'Staff dashboard'}</h1>
          </div>
          <span className="role-pill">{isAdmin ? 'Administrator' : 'Staff'}</span>
        </div>
        <div className="metric-grid">
          {cards.map(({ label, value }) => (
            <article className="metric-card" key={label}>
              <p>{label}</p>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
        <p className="dashboard-note">
          This dashboard shows current summary data. Management modules can be added as the
          corresponding workflows are implemented.
        </p>
      </section>
    </main>
  );
}
