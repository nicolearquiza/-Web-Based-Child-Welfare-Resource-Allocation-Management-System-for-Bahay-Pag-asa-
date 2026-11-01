# Bahay Pag-asa Resource Allocation System

A JavaScript web application built with Next.js, Supabase Auth, and Supabase Postgres. It includes email/password sign-in, role-protected administrator and staff dashboards, and database row-level security.

## Requirements

- Node.js 22.13 or newer in the 22.x release line, or Node.js 24.x
- npm
- A Supabase project

## Step-by-step: connect Supabase

1. **Create a Supabase project.** Sign in to Supabase, create a project, choose its organization and region, and save the database password somewhere secure. Wait for project setup to finish.
2. **Create the app tables and security policies.** Open the project's **SQL Editor**, create a query, paste in the full contents of [`supabase/migrations/20261028000000_initial_schema.sql`](./supabase/migrations/20261028000000_initial_schema.sql), and run it. Confirm the query completes successfully.
3. **Copy the app's public connection values.** Open **Project Settings → API** (or **API Keys**, depending on the dashboard layout). Copy:
   - The project URL, such as `https://abcdefgh.supabase.co`
   - The publishable key, or the legacy `anon` key

   This app expects the publishable/anon key in `NEXT_PUBLIC_SUPABASE_ANON_KEY`. **Never use or expose the `service_role` or secret key** in browser code, `.env.local`, or a `NEXT_PUBLIC_*` variable.
4. **Configure email sign-in.** Open **Authentication → Providers → Email** and make sure Email is enabled. Disable public sign-ups so users cannot create their own accounts; create staff accounts through the Supabase dashboard instead.
5. **Configure allowed app URLs.** Under **Authentication → URL Configuration**, add `http://localhost:3000/**` to **Redirect URLs** for local testing. After deploying, also add your Vercel production URL and any preview URLs you intend to use. Set the **Site URL** to your production Vercel URL after the first deployment.
6. **Create your first account.** Open **Authentication → Users → Add user**, enter an email and a strong password, and create the user. If Supabase asks for email confirmation, confirm the user in the dashboard. The migration's database trigger automatically creates a matching profile with the `staff` role.
7. **Promote that account to admin.** In **Authentication → Users**, copy the user's UUID (ID). In the SQL Editor, replace `AUTH_USER_UUID` with that ID and run:

   ```sql
   update public.user_profiles
   set role = 'admin'
   where id = 'AUTH_USER_UUID';
   ```

8. **Create a local environment file.** In the project folder, copy `.env.example` to `.env.local` and enter the values you copied:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-publishable-or-anon-key
   ```

   Keep the real `.env.local` private; it is excluded from Git.
9. **Start and test locally.** Install Node.js 22.13+ or 24.x LTS and npm if they are not installed. After installing, close and reopen PowerShell (or the VS Code window) so it loads the updated `PATH`. Verify `node --version` and `npm --version`, then open PowerShell in the project folder and run:

   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) and sign in with the email and password created in step 6. The account promoted in step 7 should open the administrator dashboard.

   **Windows PowerShell troubleshooting:** Check `node --version` and `npm.cmd --version` before installing. If `node` reports a version older than 22.13 (or `npm.cmd install` fails while replacing files under `node_modules\.bin`), the terminal may be using an older system Node.js/npm even though the project's per-user Node.js is installed. Close and reopen PowerShell or restart VS Code to reload the updated user `PATH`. If the version is still wrong, call the project's Node.js/npm directly:

   ```powershell
   $node22 = "$env:LOCALAPPDATA\Programs\nodejs-22.23.4"
   $env:Path = "$node22;$env:Path"
   node --version
   npm.cmd --version
   npm.cmd install
   npm.cmd run dev
   ```

   Use `npm.cmd` in PowerShell to invoke npm's Windows command file without changing the PowerShell script execution policy.

The migration enables row-level security for application tables. Keep it enabled, and never put a Supabase service-role key in the browser or in a `NEXT_PUBLIC_*` variable.

## Step-by-step: deploy to Vercel

1. **Push the project to GitHub.** Commit and push the project files, including `package.json` and `package-lock.json`. Do not commit `.env.local`, passwords, or secret keys.
2. **Import the repository.** Sign in to Vercel, choose **Add New → Project**, import the GitHub repository, and keep the detected **Next.js** framework preset.
3. **Choose the Node.js version.** In the Vercel project settings, select Node.js 22.x or 24.x, which satisfies the version required by this project.
4. **Set the Supabase environment variables.** In the project’s **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase publishable key or legacy anon key

   Apply them to **Production** and to **Preview** or **Development** if you will use those environments. Do not add a service-role key.
5. **Deploy.** Choose **Deploy**. Vercel installs the npm dependencies and runs `npm run build` automatically.
6. **Allow the deployed URL in Supabase.** After Vercel gives you a production domain (for example, `https://your-project.vercel.app`), return to **Supabase → Authentication → URL Configuration**:
   - Set **Site URL** to that production URL.
   - Add that URL to **Redirect URLs**.
   - Add the specific preview URLs you plan to use if testing Vercel previews.
7. **Redeploy and verify.** If you changed environment variables or URL settings after deployment, redeploy from Vercel. Open the production URL and sign in with the admin account from the Supabase setup steps.
8. **Add staff accounts.** Create each staff user in **Supabase → Authentication → Users → Add user**. New users receive the `staff` role by default. Promote only approved administrators by updating their `user_profiles.role`.

Vercel automatically uses `npm run build`; no custom server or `vercel.json` is needed. If a deployment fails, open the Vercel project's **Deployments → Build Logs**, and check that both Supabase environment variables are set for the deployment environment.

## Current application scope

- Email/password authentication through Supabase Auth
- Active account checks and role-based admin/staff routing
- Dashboard summary counts backed by Supabase tables
- RLS-protected initial data model for children, donations, resources, partners, allocations, and audit records

The full CRUD, reporting, and distribution workflows from the original specification are not implemented yet.
