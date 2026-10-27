# SOFTWARE SPECIFICATION

**System:** Child Welfare Resource Allocation Management System
**Organization:** Bahay Pag-asa, San Antonio, Biñan City, Laguna

---

## 1. Development Environment

| Item | Specification |
|---|---|
| Operating System | Windows 10 or later (64-bit) |
| Local Server Package | XAMPP |
| Web Server | Apache 2.4.56 |
| Server-Side Language | PHP 8.2.4 |
| Database Server | MariaDB 10.4.28 (MySQL-compatible) |
| Database Name | `bahay_pagasa` |
| Database Access | PHP MySQLi extension |
| Database Management Tool | phpMyAdmin |
| Code Editor | Visual Studio Code |
| Front-End Languages | HTML5, CSS3, JavaScript |

## 2. Front-End Libraries

| Library | Version | Purpose |
|---|---|---|
| Bootstrap | 5.3.3 | Responsive layout and components |
| Bootstrap Icons | 1.11.3 | Icons for menus and buttons |
| jQuery | 3.7.1 | Required by DataTables |
| DataTables | 1.13.8 | Searching, sorting, and paging of tables |

These libraries are loaded from online CDNs, so client computers need internet access unless the files are hosted locally.

## 3. Client (User) Software Requirements

| Item | Requirement |
|---|---|
| Operating System | Windows 10 or later, or any OS with a modern browser |
| Web Browser | Google Chrome, Microsoft Edge, or Mozilla Firefox (latest versions) |
| Other | JavaScript and cookies enabled; PDF or printer driver for printing reports |

## 4. Server Software Requirements

| Item | Requirement |
|---|---|
| XAMPP | With Apache, MySQL/MariaDB, and PHP modules running |
| PHP | 8.x with the `mysqli` extension enabled |
| Database | MySQL or MariaDB with `utf8mb4` character set |
| Deployment Folder | `C:\xampp\htdocs\nicole` |
| Setup | Import `database/schema.sql` to create the database tables |

## 5. System Architecture

The system is a web-based, server-side application. Users open it in a browser; Apache passes each request to PHP, which reads and writes data in the MariaDB/MySQL database.

```
Browser (Admin / Staff)  <-->  Apache + PHP  <-->  MariaDB / MySQL
```

### 5.1 Folder Structure

| Folder / File | Contents |
|---|---|
| `index.php` | Login page |
| `logout.php` | Ends the user session |
| `admin/` | Administrator modules: accounts, children, resources, partners, donations, distribution (`donation-monitoring`), audit trail (`audit-logs`), reports, dashboard |
| `staff/` | Staff modules: children, cases, donations, reports, dashboard |
| `includes/` | Shared files: header, sidebar, footer, authentication, helper functions, flash messages |
| `config/` | Database connection settings |
| `database/` | `schema.sql` database structure |
| `assets/` | CSS (`style.css`) and JavaScript (`app.js`) |

## 6. Database Specification

| Table | Purpose |
|---|---|
| `users` | User accounts, roles (admin or staff), and status |
| `children` | Child case records, including case status and archive flag |
| `case_status_history` | History of changes to a child's case status |
| `partners` | Partner organization information |
| `resources` | Inventory items, including archive flag |
| `resource_allocations` | Allocation of resources |
| `donations` | Donation records (donor, type, amount, date, status) |
| `donation_monitoring` | Distribution of donations, including archive flag |
| `activity_logs` | Audit trail of user activities |

## 7. Functional Specification

### 7.1 Administrator

| Module | Functions |
|---|---|
| Dashboard | Summary of active children, monthly donations, resources, partners, pending donations, recent records |
| Account Management | Add, edit user accounts |
| Child Records | Add, view, edit, archive, restore, delete |
| Resource & Inventory | Add, edit, archive, restore, delete |
| Partner Information | Add, edit partner organizations |
| Donation Management | Add, edit donations; amount field shown for cash donations only |
| Distribution | Record, archive, restore, delete distributions |
| Audit Trail | View logged user activities |
| Generate Reports | Child, donation, resource, and partner reports; print report data only |

### 7.2 Staff

| Module | Functions |
|---|---|
| Dashboard | Summary of active children, own donations, recent records |
| Child Records | View child records |
| Donation Management | Record and view own donations |
| Update Case Status | Change a child's case status, with history saved |
| Generate Reports | Child, own donation, and case update reports; print report data only |

## 8. Non-Functional Specification

| Quality | Specification |
|---|---|
| Security | Login required; role-based page access; passwords stored hashed (`password_verify`); prepared statements on data entry; output escaped to prevent script injection; session ID regenerated on login |
| Usability | Sidebar navigation with highlight of the current section; search, sort, and paging on tables; confirmation before archive or delete |
| Reliability | Archived records can be restored; only archived records can be permanently deleted |
| Accountability | Key actions saved in the audit trail with user and date and time |
| Portability | Runs on any computer with XAMPP; database moved using `schema.sql` |
| Maintainability | Code separated by module and shared include files |

## 9. Software Requirements Summary

| Category | Requirement |
|---|---|
| Server | Windows 10+, XAMPP (Apache 2.4, PHP 8.2, MariaDB 10.4) |
| Client | Modern browser (Chrome, Edge, Firefox) |
| Network | LAN, plus internet for CDN libraries |
| Database | `bahay_pagasa`, created from `database/schema.sql` |
