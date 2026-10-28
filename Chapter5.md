# CHAPTER 5

# SUMMARY OF FINDINGS, CONCLUSIONS, AND RECOMMENDATIONS

This chapter presents the current implementation status and recommendations for the **Child Welfare Resource Allocation Management System** of Bahay Pag-asa, San Antonio, Biñan City, Laguna.

---

## 5.1 Summary of the Study

The project is intended to support the management of child case records, resources, donations, and related information at Bahay Pag-asa. The current application code has been converted to **JavaScript** using **Next.js** and **React**, with **Supabase Auth** for authentication, **Supabase Postgres** for data, and **Vercel** as its deployment target.

The current implementation provides email-and-password sign-in, active-account checks, role-protected Administrator and Staff dashboards, and database row-level security. Its dashboard pages display summary counts from Supabase.

| Area | Current implementation |
|---|---|
| Authentication | Supabase Auth email/password sign-in; user accounts are provisioned by an administrator |
| Authorization | Administrator and Staff roles, active-account checks, protected routes, and database row-level security |
| Administrator dashboard | Counts for active children, donation records received this month, resources, and partners |
| Staff dashboard | Counts for active children, the signed-in staff member's donation records, and case history entries |
| Database | Supabase migration defining the initial tables, trigger, grants, and row-level security policies |
| Deployment | Next.js build configuration and setup instructions for Vercel |

The earlier specification includes child-record management, donation entry, resource allocation, distribution, audit-log viewing, and report generation. Those user-facing workflows are not implemented in the current application and should be treated as future work.

Notable features currently present:

1. **Role-based access.** Administrator and Staff dashboards verify the signed-in user's active profile and role.
2. **Managed accounts.** Public registration is not part of the application; accounts are created in Supabase Auth and assigned a role by an administrator.
3. **Database access policies.** The Supabase migration enables row-level security and defines access rules for the initial application tables.
4. **Cloud deployment setup.** The repository includes environment-variable and Vercel setup instructions. A live deployment still requires a configured Supabase project and Vercel project.

---

## 5.2 Summary of Findings

The current codebase establishes the application's cloud-hosted foundation: authentication, role-aware route handling, a relational data model, and dashboard queries. It does not yet provide the complete record-management workflows described in the original specification, so those functions require implementation and testing before the system can be considered feature-complete.

No user evaluation results or production deployment results are asserted in this summary.

---

## 5.3 Conclusions

The conversion establishes a JavaScript and Supabase foundation suitable for deployment through Vercel. Supabase Auth and database row-level security provide the initial authentication and access-control mechanisms. The application is not yet a complete resource-allocation management system: the planned CRUD, archive and restore, distribution, audit-trail, and reporting workflows remain to be built and validated.

---

## 5.4 Recommendations

1. **Complete core modules.** Implement and test child records, resources, partners, donation management, distributions, and reports.
2. **Test access policies.** Verify every read and write operation using separate Administrator and Staff accounts before entering real child-welfare data.
3. **Backup and recovery.** Establish and test regular database backups and a recovery process.
4. **Audit coverage.** Record important changes, including old and new values, and provide appropriate administrative audit-log views.
5. **Archive policy.** Define how long archived records are retained and who may permanently remove them.
6. **Reports and notifications.** Add validated reports, exports, and alerts for low inventory, pending donations, and cases needing follow-up.
7. **Mobile usability.** Test the complete workflows on phones and tablets.
8. **Deployment readiness.** Configure Supabase authentication URLs and Vercel environment variables, then verify the hosted deployment over HTTPS before production use.
9. **Training and privacy.** Train users and establish procedures for handling confidential case data.
