# VERIFICATION STUDIES

## Software Evaluation Using ISO/IEC 9126

### 1. Purpose

This draft evaluation instrument is for the current JavaScript application for Bahay Pag-asa, built with Next.js, Supabase Auth, and Supabase Postgres and intended for Vercel deployment. It measures six software quality characteristics. Complete the evaluation only after the application has been configured, deployed, and tested. The current implementation covers sign-in, role-protected dashboards, and initial database policies; it does not yet include all record-management, distribution, or reporting workflows in the original plan.

### 2. The ISO/IEC 9126 Quality Characteristics

| Characteristic | Meaning | Sub-characteristics |
|---|---|---|
| **Functionality** | The system provides the functions needed by its users. | Suitability, Accuracy, Interoperability, Security, Compliance |
| **Reliability** | The system keeps working correctly under stated conditions. | Maturity, Fault Tolerance, Recoverability |
| **Usability** | The system is easy to understand, learn, and use. | Understandability, Learnability, Operability, Attractiveness |
| **Efficiency** | The system responds quickly and uses resources well. | Time Behavior, Resource Utilization |
| **Maintainability** | The system can be corrected, improved, and updated. | Analyzability, Changeability, Stability, Testability |
| **Portability** | The system can be used in different environments. | Adaptability, Installability, Co-existence, Replaceability |

### 3. Respondents

| Respondent Group | Description | Number of Respondents |
|---|---|---|
| Administrators / Management | Personnel who manage accounts and oversee the system | ___ |
| Staff / Social Workers | Users who access the staff dashboard | ___ |
| IT Experts | Persons knowledgeable in software quality | ___ |
| **Total** | | ___ |

### 4. Evaluation Instrumen

Respondents rate each statement from 1 to 5.

Rate only functionality that is present in the deployed version. Statements about planned workflows must be added after those features are implemented.

**Rating Scale**

| Scale | Range | Verbal Interpretation |
|---|---|---|
| 5 | 4.21 – 5.00 | Excellent |
| 4 | 3.41 – 4.20 | Very Good |
| 3 | 2.61 – 3.40 | Good |
| 2 | 1.81 – 2.60 | Fair |
| 1 | 1.00 – 1.80 | Poor |

#### A. Functionality

| No. | Statement | 5 | 4 | 3 | 2 | 1 |
|---|---|---|---|---|---|---|
| 1 | The system allows a provisioned user to sign in using email and password. | | | | | |
| 2 | The system directs administrators and staff to their appropriate dashboards. | | | | | |
| 3 | Inactive or unconfigured accounts are prevented from accessing a dashboard. | | | | | |
| 4 | The dashboard displays summary counts from the database. | | | | | |
| 5 | Row-level security restricts access to application data according to the user's role. | | | | | |
| 6 | The login page clearly explains that accounts are provisioned by an administrator. | | | | | |
| 7 | The system displays an appropriate message when sign-in fails. | | | | | |

#### B. Reliability

| No. | Statement | 5 | 4 | 3 | 2 | 1 |
|---|---|---|---|---|---|---|
| 1 | The system runs without errors or unexpected shutdowns during use. | | | | | |
| 2 | The system shows a useful message when sign-in fails. | | | | | |
| 3 | The system handles an inactive account without granting dashboard access. | | | | | |
| 4 | The application maintains the user's authenticated session while navigating protected pages. | | | | | |
| 5 | Dashboard counts reflect the data currently stored in Supabase. | | | | | |

#### C. Usability

| No. | Statement | 5 | 4 | 3 | 2 | 1 |
|---|---|---|---|---|---|---|
| 1 | The menus and page titles are clear and easy to understand. | | | | | |
| 2 | The system is easy to learn, even without extensive training. | | | | | |
| 3 | The sign-in form labels and instructions are easy to understand. | | | | | |
| 4 | The system clearly identifies whether the user is an administrator or staff member. | | | | | |
| 5 | The dashboard layout and colors are pleasing. | | | | | |
| 6 | Dashboard summary values are easy to find and understand. | | | | | |

#### D. Efficiency

| No. | Statement | 5 | 4 | 3 | 2 | 1 |
|---|---|---|---|---|---|---|
| 1 | Pages load quickly. | | | | | |
| 2 | Signing in and opening the correct dashboard takes a reasonable amount of time. | | | | | |
| 3 | Dashboard summary counts load in a reasonable amount of time. | | | | | |
| 4 | The web application runs smoothly on the user's device. | | | | | |

#### E. Maintainability

| No. | Statement | 5 | 4 | 3 | 2 | 1 |
|---|---|---|---|---|---|---|
| 1 | The application separates pages, components, authentication, and database access into clear areas. | | | | | |
| 2 | The database structure is maintained using versioned migration files. | | | | | |
| 3 | Environment-specific settings are separated from application source code. | | | | | |
| 4 | The application can be built and tested independently of its production deployment. | | | | | |

#### F. Portability

| No. | Statement | 5 | 4 | 3 | 2 | 1 |
|---|---|---|---|---|---|---|
| 1 | The system works on common web browsers. | | | | | |
| 2 | The application can be deployed to Vercel using the documented configuration. | | | | | |
| 3 | The system's pages adjust to different screen sizes. | | | | | |
| 4 | The application can connect to a configured Supabase project using environment variables. | | | | | |

### 5. Statistical Treatmen

The **weighted mean** is used for each statement and each characteristic:


Weighted Mean = Σ(f × w) / N


where **f** is the number of respondents who chose a rating, **w** is the rating (1 to 5), and **N** is the total number of respondents.

The **overall mean** is the average of the six characteristic means. Each mean is interpreted using the rating scale in Section 4.

### 6. Presentation of Results

*To be completed after the evaluation. Do not fill in until real responses are gathered.*

**Table 1. Summary of the ISO/IEC 9126 evaluation**

| Characteristic | Administrators | Staff | IT Experts | Overall Mean | Interpretation |
|---|---|---|---|---|---|
| Functionality | | | | | |
| Reliability | | | | | |
| Usability | | | | | |
| Efficiency | | | | | |
| Maintainability | | | | | |
| Portability | | | | | |
| **Overall** | | | | | |

**Table 2. Results per statement (repeat for each characteristic)**

| No. | Statement | Mean | Interpretation |
|---|---|---|---|
| | | | |

### 7. Interpretation and Discussion

*Write after the results are computed. Suggested structure:*

1. State which characteristic obtained the highest and lowest mean.
2. Explain what the overall mean means for the quality of the system.
3. Discuss low-rated statements and the actions taken or recommended.
4. Conclude whether the system is acceptable based on the overall interpretation.
