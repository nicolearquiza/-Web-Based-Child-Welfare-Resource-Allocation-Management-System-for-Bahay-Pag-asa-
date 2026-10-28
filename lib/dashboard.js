import { createClient } from '@/lib/supabase/server';

async function countRows(supabase, table, applyFilters) {
  let query = supabase.from(table).select('id', { count: 'exact', head: true });
  if (applyFilters) query = applyFilters(query);
  const { count, error } = await query;

  if (error) {
    throw new Error(`Unable to load ${table} dashboard data: ${error.message}`);
  }

  return count ?? 0;
}

export async function getDashboardMetrics(role, userId) {
  const supabase = await createClient();
  const now = new Date();
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
    .toISOString()
    .slice(0, 10);

  const queries = [
    countRows(supabase, 'children', (query) => query.eq('is_archived', false)),
    countRows(supabase, 'donations', (query) =>
      role === 'admin'
        ? query.gte('date_received', startOfMonth)
        : query.eq('created_by', userId),
    ),
  ];

  if (role === 'admin') {
    queries.push(countRows(supabase, 'resources', (query) => query.eq('is_archived', false)));
    queries.push(countRows(supabase, 'partners'));
  } else {
    queries.push(countRows(supabase, 'case_status_history', (query) => query.eq('changed_by', userId)));
  }

  const results = await Promise.all(queries);
  return role === 'admin'
    ? { children: results[0], donations: results[1], resources: results[2], partners: results[3] }
    : { children: results[0], donations: results[1], caseUpdates: results[2] };
}
