import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/LoginForm';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function LoginPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`Unable to validate the Supabase session: ${authError.message}`);
  }

  if (user) {
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('role, status')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      throw new Error(`Unable to load the signed-in user profile: ${error.message}`);
    }

    if (profile?.status === 'active') {
      redirect(profile.role === 'admin' ? '/admin' : '/staff');
    }
  }

  return <LoginForm unauthorized={resolvedSearchParams?.error === 'unauthorized'} />;
}
