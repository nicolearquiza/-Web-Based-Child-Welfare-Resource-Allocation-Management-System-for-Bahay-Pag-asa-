# VERIFICATION STUDIES

## Software Evaluation Using ISO/IEC 9126

### 1. Purpose

The Child Welfare Resource Allocation Management System of Bahay Pag-asa was evaluated using the **ISO/IEC 9126 Software Quality Model** to verify that it meets the quality expected of the system. The evaluation measures how the respondents rate the system on six quality characteristics.

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
| Administrators / Management | Head and staff who manage accounts, records, inventory, and reports | ___ |
| Staff / Social Workers | Users who record donations and update case status | ___ |
| IT Experts | Persons knowledgeable in software quality | ___ |
| **Total** | | ___ |

### 4. Evaluation Instrument

Respondents rate each statement from 1 to 5.

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
| 1 | The system provides the functions needed to manage child records, resources, partners, donations, and distribution. | | | | | |
| 2 | The system saves, updates, and displays records accurately. | | | | | |
| 3 | The Amount field appears only for cash donations, and non-cash donations are saved without an amount. | | | | | |
| 4 | Only authorized users can access each module (Administrator and Staff access). | | | | | |
| 5 | The login requirement protects confidential child records. | | | | | |
| 6 | The system generates the needed reports (child, donation, resource, partner) and prints only the report data. | | | | | |
| 7 | The Audit Trail records user activities. | | | | | |

#### B. Reliability

| No. | Statement | 5 | 4 | 3 | 2 | 1 |
|---|---|---|---|---|---|---|
| 1 | The system runs without errors or unexpected shutdowns during use. | | | | | |
| 2 | The system shows a message when required information is missing or an error occurs. | | | | | |
| 3 | Archived records can be restored, so records are not lost by mistake. | | | | | |
| 4 | Confirmation is asked before archiving or deleting a record. | | | | | |
| 5 | The system keeps data consistent after repeated use. | | | | | |

#### C. Usability

| No. | Statement | 5 | 4 | 3 | 2 | 1 |
|---|---|---|---|---|---|---|
| 1 | The menus and page titles are clear and easy to understand. | | | | | |
| 2 | The system is easy to learn, even without extensive training. | | | | | |
| 3 | The forms, buttons, and tables are easy to operate. | | | | | |
| 4 | The sidebar highlights the section the user is currently in. | | | | | |
| 5 | The design and colors of the system are pleasing. | | | | | |
| 6 | The search, sort, and filter features help in finding records quickly. | | | | | |

#### D. Efficiency

| No. | Statement | 5 | 4 | 3 | 2 | 1 |
|---|---|---|---|---|---|---|
| 1 | Pages load quickly. | | | | | |
| 2 | Saving, updating, and archiving records is done in a short time. | | | | | |
| 3 | Reports are generated quickly. | | | | | |
| 4 | The system runs smoothly on the available computer without slowing it down. | | | | | |

#### E. Maintainability

| No. | Statement | 5 | 4 | 3 | 2 | 1 |
|---|---|---|---|---|---|---|
| 1 | The system is organized by module (admin, staff, includes, database), so problems are easy to locate. | | | | | |
| 2 | New fields or modules can be added without changing the whole system. | | | | | |
| 3 | Changes to one module do not cause errors in other modules. | | | | | |
| 4 | The system can be tested module by module. | | | | | |

#### F. Portability

| No. | Statement | 5 | 4 | 3 | 2 | 1 |
|---|---|---|---|---|---|---|
| 1 | The system works on common web browsers. | | | | | |
| 2 | The system can be installed on another computer with XAMPP (Apache and MySQL). | | | | | |
| 3 | The system's pages adjust to different screen sizes. | | | | | |
| 4 | The database can be moved to another server using the provided schema file. | | | | | |

### 5. Statistical Treatment

The **weighted mean** is used for each statement and each characteristic:

```
Weighted Mean = Σ(f × w) / N
```

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
