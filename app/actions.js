'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function loginAction(_previousState, formData) {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return { error: 'Enter your email address and password.' };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return { error: 'Unable to sign in. Check your credentials or contact an administrator.' };
  }

  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('role, status')
    .eq('id', data.user.id)
    .maybeSingle();

  if (profileError) {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error('Unable to clear the session after a profile lookup failure:', signOutError.message);
    }
    console.error('Unable to load the signed-in user profile:', profileError.message);
    return { error: 'Your account profile could not be loaded. Contact an administrator.' };
  }

  if (!profile || profile.status !== 'active') {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error('Unable to clear the session for an inactive or unconfigured account:', signOutError.message);
    }
    return { error: 'Your account is inactive or is not configured. Contact an administrator.' };
  }

  redirect(profile.role === 'admin' ? '/admin' : '/staff');
}

export async function logoutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Unable to sign out:', error.message);
    throw new Error('Unable to sign out. Please try again.');
  }

  redirect('/');
}
