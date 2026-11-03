import assert from 'node:assert/strict';
import test from 'node:test';
import { createLoginAction } from '../lib/login-action.js';

function createFormData(values) {
  return { get: (name) => values[name] };
}

function createHarness({ signInResult, profileResult, signOutResult = { error: null } }) {
  const calls = { signIn: [], signOut: 0, redirect: [] };
  const supabase = {
    auth: {
      async signInWithPassword(credentials) {
        calls.signIn.push(credentials);
        return signInResult;
      },
      async signOut() {
        calls.signOut += 1;
        return signOutResult;
      },
    },
    from(table) {
      assert.equal(table, 'user_profiles');
      return {
        select(columns) {
          assert.equal(columns, 'role, status');
          return {
            eq(column, id) {
              assert.equal(column, 'id');
              assert.equal(id, signInResult.data.user.id);
              return { maybeSingle: async () => profileResult };
            },
          };
        },
      };
    },
  };

  const loginAction = createLoginAction({
    createClient: async () => supabase,
    redirect(path) {
      calls.redirect.push(path);
      throw new Error(`Redirected to ${path}`);
    },
  });

  return { calls, loginAction };
}

test('requires email and password before contacting Supabase', async () => {
  let clientCreated = false;
  const loginAction = createLoginAction({
    createClient: async () => {
      clientCreated = true;
      throw new Error('Should not create a client');
    },
    redirect() {},
  });

  const result = await loginAction(null, createFormData({ email: ' ', password: '' }));

  assert.deepEqual(result, { error: 'Enter your email address and password.' });
  assert.equal(clientCreated, false);
});

test('normalizes email and redirects an active staff account to the staff dashboard', async () => {
  const harness = createHarness({
    signInResult: { data: { user: { id: 'staff-id' } }, error: null },
    profileResult: { data: { role: 'staff', status: 'active' }, error: null },
  });

  await assert.rejects(
    harness.loginAction(null, createFormData({ email: ' Alexa@Example.com ', password: 'test-password' })),
    /Redirected to \/staff/,
  );

  assert.deepEqual(harness.calls.signIn, [{ email: 'alexa@example.com', password: 'test-password' }]);
  assert.deepEqual(harness.calls.redirect, ['/staff']);
  assert.equal(harness.calls.signOut, 0);
});

test('redirects an active administrator to the admin dashboard', async () => {
  const harness = createHarness({
    signInResult: { data: { user: { id: 'admin-id' } }, error: null },
    profileResult: { data: { role: 'admin', status: 'active' }, error: null },
  });

  await assert.rejects(
    harness.loginAction(null, createFormData({ email: 'admin@example.com', password: 'test-password' })),
    /Redirected to \/admin/,
  );

  assert.deepEqual(harness.calls.redirect, ['/admin']);
});

test('rejects inactive accounts and clears the authenticated session', async () => {
  const harness = createHarness({
    signInResult: { data: { user: { id: 'inactive-id' } }, error: null },
    profileResult: { data: { role: 'staff', status: 'inactive' }, error: null },
  });

  const result = await harness.loginAction(
    null,
    createFormData({ email: 'staff@example.com', password: 'test-password' }),
  );

  assert.deepEqual(result, {
    error: 'Your account is inactive or is not configured. Contact an administrator.',
  });
  assert.equal(harness.calls.signOut, 1);
  assert.deepEqual(harness.calls.redirect, []);
});

test('reports invalid credentials without looking up a profile', async () => {
  const harness = createHarness({
    signInResult: { data: { user: null }, error: { message: 'Invalid login credentials' } },
    profileResult: { data: null, error: null },
  });

  const result = await harness.loginAction(
    null,
    createFormData({ email: 'staff@example.com', password: 'wrong-password' }),
  );

  assert.deepEqual(result, {
    error: 'Unable to sign in. Check your credentials or contact an administrator.',
  });
  assert.equal(harness.calls.signOut, 0);
});
