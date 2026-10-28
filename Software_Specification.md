# Software Specification

**System:** Child Welfare Resource Allocation Management System
**Organization:** Bahay Pag-asa, San Antonio, Biñan City, Laguna

## 1. Technology

| Area | Technology |
|---|---|
| Application | JavaScript, Next.js 14 App Router, React 18 |
| Hosting | Vercel |
| Authentication | Supabase Auth (email and password) |
| Database | Supabase Postgres |
| Database access | Supabase JavaScript client with row-level security |
| Styling | CSS |

## 2. Architecture

```tex
Browser <--> Next.js application on Vercel <--> Supabase Auth and Postgres


The application uses server-rendered Next.js pages and Supabase-managed authentication sessions. The browser only receives the Supabase publishable/anon key. Row-level security policies enforce access to application data; no service-role key is used by the app.

## 3. Application structure

| Path | Purpose |
|---|---|
| `app/` | Login, role dashboards, shared layout, and server actions |
| `components/` | Login form and dashboard UI |
| `lib/` | Supabase server client, authentication checks, and dashboard queries |
| `proxy.js` | Refreshes auth cookies and redirects unauthenticated users from protected pages |
| `supabase/migrations/` | Postgres schema, indexes, trigger, grants, and row-level security policies |

## 4. Data model

| Table | Purpose |
|---|---|
| `user_profiles` | Auth-linked user name, role, and active/inactive status |
| `children` | Child case records and archive flag |
| `case_status_history` | Case-status change history |
| `partners` | Partner organizations |
| `resources` | Inventory items and archive flag |
| `resource_allocations` | Resource allocations |
| `donations` | Donation records, including creator |
| `donation_monitoring` | Donation distributions and archive flag |
| `activity_logs` | User activity audit records |

## 5. Current functionality

| Role | Current functions |
|---|---|
| Administrator | Sign in, role-protected dashboard, counts for active children, donations this month, resources, and partners |
| Staff | Sign in, role-protected dashboard, counts for active children, own donation records, and case updates |

The additional CRUD, archive/restore, reporting, and distribution functions in the earlier specification remain future work.

## 6. Account and deployment requirements

- Users are created by an administrator in Supabase Auth; public sign-up is disabled.
- New Auth users receive a staff profile from the database trigger. An administrator explicitly promotes designated accounts to `admin`.
- The app requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in local and Vercel environment settings.
- Apply the SQL migration before using the app.
- Vercel builds the project using `npm run build`.

See [README.md](./README.md) for setup and deployment steps.
