import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function requireRole(role) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError && authError.name !== 'AuthSessionMissingError') {
    throw new Error(`Unable to validate the Supabase session: ${authError.message}`);
  }

  if (!user) {
    redirect('/');
  }

  const { data: profile, error } = await supabase
    .from('user_profiles')
    .select('full_name, role, status')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load your account profile: ${error.message}`);
  }

  if (!profile || profile.status !== 'active') {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error('Unable to clear the session for an inactive or unconfigured account:', signOutError.message);
    }
    redirect('/');
  }

  if (profile.role !== role) {
    redirect(profile.role === 'admin' ? '/admin' : '/staff');
  }

  return { user, profile };
}
