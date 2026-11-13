# StudentSphere — Stakeholder Analysis

## 1. Project Overview & Objectives
**StudentSphere** is an enterprise-grade academic management and portfolio portal designed to serve the community of **Africa University**. The platform manages sensitive student records, official lecturer recommendations, achievement verifications, and academic grades. 

To ensure long-term adoption, regulatory compliance, and user satisfaction, this stakeholder analysis identifies all key constituent groups, maps their interests and levels of influence, and establishes an active stakeholder engagement plan.

---

## 2. Identified Stakeholders & Profiles

### 2.1 Primary Internal Stakeholders
1. **Students (Undergraduate & Postgraduate)**
   - *Interest:* High. Need rapid access to verified academic results, real-time GPA tracking, an easy portfolio showcase for internships, and a frictionless recommendation letter request process.
   - *Influence:* Medium. Their daily adoption and feedback drive iterative improvements in usability and navigation.
   - *Key Needs:* Mobile-friendly interface, transparent recommendation statuses, fast evidence verification, and privacy protection.

2. **Academic Lecturers & Faculty**
   - *Interest:* High. Need reliable, consolidated summaries of student performance when evaluating recommendation requests, an efficient letter drafting workflow, and clear tools to submit course marks.
   - *Influence:* High. Faculty adoption is mandatory for grade submissions and recommendation letter issuance.
   - *Key Needs:* Streamlined grading entry, automated notifications when requests arrive, ability to decline or request more info with audit trails, and customizable letter templates.

3. **System Administrators (Registrar & Academic Affairs)**
   - *Interest:* High. Responsible for platform governance, data integrity, user authorization, and compliance with university policies.
   - *Influence:* High. Have authority over account activations, lecturer assignments, and official result batch approvals.
   - *Key Needs:* Intuitive admin dashboard, comprehensive audit logging, bulk roster imports, email preview logs, and fail-safe marks approval workflows.

### 2.2 Secondary & Supporting Stakeholders
4. **Africa University ICT Directorate**
   - *Interest:* High. Concerned with system architecture, security standards, server uptime, database scalability, and adherence to cloud hosting guidelines.
   - *Influence:* High. Dictate infrastructure policies, SSL certificate deployment, API security requirements, and data privacy protocols.
   - *Key Needs:* Strict RBAC enforcement, SSL/TLS database encryption (`prod-ca-2021.crt`), secure file storage outside web roots, and reliable error logging.

5. **University Executive Management & Deans**
   - *Interest:* Medium. Focused on institutional reputation, accreditation standards, graduation metrics, and high-quality alumni references.
   - *Influence:* High. Provide institutional backing, approve academic policies, and review aggregated academic performance reports.
   - *Key Needs:* Aggregate GPA distributions, Dean's List reporting, academic warning flags, and high system reliability.

6. **External Recipients (Employers, Graduate Schools, Scholarship Boards)**
   - *Interest:* Medium. Depend on the authenticity and timeliness of recommendation letters and student transcripts issued by Africa University.
   - *Influence:* Low to Medium. Validate student credentials and contact the university for verification.
   - *Key Needs:* Authenticated, professional recommendation letters with university branding, issuer details, and verifiable student transcripts.

---

## 3. Stakeholder Power / Interest Grid

```
                  HIGH INFLUENCE
                       │
       [Keep Satisfied]│      [Manage Closely]
                       │
   University Exec.   │   System Administrators
   ICT Directorate    │   Academic Lecturers
                       │   Project Developers
  ─────────────────────┼─────────────────────────
                       │
       [Monitor]       │      [Keep Informed]
                       │
   External Employers  │   Enrolled Students
   Scholarship Boards  │   Faculty Admin Assistants
                       │
                       ▼ LOW INFLUENCE
  LOW INTEREST ────────────────────────► HIGH INTEREST
```

---

## 4. Stakeholder Engagement & Communication Plan

| Stakeholder Group | Primary Engagement Channel | Frequency | Key Objectives |
|---|---|---|---|
| **Students** | In-app notification center, student union briefings, email alerts | Continuous / Per Event | Deliver status updates on recommendations and marks; gather usability feedback. |
| **Lecturers** | Faculty board demonstrations, email notifications, portal dashboard | Weekly / Sprint Milestones | Train on marks submission workbench and recommendation drafting tools. |
| **Administrators** | Administrative console, review meetings, audit reports | Bi-weekly | Review account approval queues, batch marks approvals, and system logs. |
| **ICT Team** | Technical architecture reviews, security walkthroughs | Milestone Releases | Verify database pool stability, SSL CA configurations, and persistent storage mounts. |
| **Project Team** | Standup meetings, GitHub issues, pull request reviews | Daily / Sprints | Coordinate module integration, code reviews, test executions, and documentation. |

---

## 5. Risk Assessment & Mitigation Strategies

| Risk Description | Impacted Stakeholders | Severity | Mitigation Strategy Implemented in StudentSphere |
|---|---|---|---|
| **Unauthorized Grade Modification** | University, Students, Faculty | High | Only authorized administrators can approve result batches (`POST /api/admin/results/approve`). Strict audit logging on every grade change. |
| **Forged Achievement Uploads** | Lecturers, Employers | High | Student achievements require lecturer verification; files are inspected for MIME validity and stored on private persistent disks. |
| **Unresponsive Recommendation Requests** | Students, Lecturers | Medium | Real-time email notifications and deadline reminders; status tracker keeps students updated on each stage. |
| **Server Outage During Submission** | All Users | High | Stateless Express architecture hosted on Render with health checks (`/api/health`) and managed Supabase PostgreSQL connection pooling. |
