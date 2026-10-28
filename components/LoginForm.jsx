'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction } from '@/app/actions';

const initialState = { error: '' };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button button-primary button-full" type="submit" disabled={pending}>
      {pending ? 'Signing in…' : 'Sign in'}
    </button>
  );
}

export function LoginForm({ unauthorized }) {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="brand-mark" aria-hidden="true">♥</div>
        <p className="eyebrow">Child Welfare &amp; Resource Allocation System</p>
        <h1 id="login-title">Bahay Pag-asa</h1>
        <p className="location">San Antonio, Biñan City, Laguna</p>
        <div className="login-divider" />
        <h2>Sign in to your account</h2>
        {unauthorized && (
          <p className="notice notice-warning" role="alert">
            Sign in with an authorized account to continue.
          </p>
        )}
        {state.error && (
          <p className="notice notice-error" role="alert">
            {state.error}
          </p>
        )}
        <form action={formAction}>
          <label htmlFor="email">Email address</label>
          <input
            autoComplete="username"
            autoFocus
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
          <label htmlFor="password">Password</label>
          <input
            autoComplete="current-password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            type="password"
          />
          <SubmitButton />
        </form>
        <p className="login-help">Accounts are managed by your system administrator.</p>
      </section>
      <footer className="login-footer">© {new Date().getFullYear()} Bahay Pag-asa</footer>
    </main>
  );
}
