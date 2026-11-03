'use server';

import { redirect } from 'next/navigation';
import { createLoginAction } from '@/lib/login-action';
import { createClient } from '@/lib/supabase/server';

const performLogin = createLoginAction({ createClient, redirect });

export async function loginAction(previousState, formData) {
  return performLogin(previousState, formData);
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
