# StudentSphere — Software Quality Assurance Test Plan

**Lead QA Engineer:** Ian Edson Mwashanja (`Ian-Edson-Mwashanja`)  
**Project:** Africa University Student Information, Portfolio & Recommendation System  
**Version:** 2.0.0 (Production Supabase PostgreSQL Release)

---

## 1. Test Strategy & Objectives
The primary objective of the StudentSphere Quality Assurance program is to verify that all functional requirements, security controls, database transactions, and user workflows operate reliably, securely, and in compliance with Africa University academic policies.

### Core Testing Pillars:
1. **Security & Access Control:** Verification of Role-Based Access Control (RBAC), password hashing, JWT expiration, and file streaming ownership checks.
2. **Database Integrity & Data Transactions:** Validation of multi-table ACID transactions during marks approvals and recommendation status transitions in Supabase PostgreSQL.
3. **Workflow State Machines:** Verification of all valid and invalid transitions in recommendation requests and achievement verification lifecycles.
4. **Cross-Browser & Responsive UI:** Testing across desktop, tablet, and mobile viewport sizes on Chromium, Gecko, and WebKit rendering engines.
5. **Deployment & Resilience:** Smoke testing of health endpoints, connection pool exhaustion handling, and email failover in dev mode.

---

## 2. Test Environment
- **Node.js Runtime:** v20+ / v26.13.0
- **Database Server:** Supabase Managed PostgreSQL (AWS EU-West-1 pooler, search path: `studentsphere,public`, SSL CA: `prod-ca-2021.crt`)
- **Hosting Environment:** Render Web Service (Ubuntu Linux container)
- **Local Development URL:** `http://localhost:3000`
- **Health Check Endpoint:** `http://localhost:3000/api/health`
- **Supported Browsers:** Google Chrome 120+, Mozilla Firefox 120+, Apple Safari 17+, Microsoft Edge 120+

---

## 3. Scope of Testing

### 3.1 In-Scope Testing Items
- **Authentication & Authorization:** Student roster check, student registration, lecturer registration, admin approval, JWT validation, password recovery, session expiration.
- **Student Portal:** Profile updates, portfolio project creation/deletion, achievement evidence uploads (PDF/image $\le 4\text{MB}$), recommendation request submission.
- **Lecturer Portal:** Review of assigned students, recommendation review, draft letter editing, letter release toggle, achievement verification/rejection, course marks entry.
- **Admin Portal:** User account approval/rejection, student-lecturer assignments, course management, marks batch approvals, email inspection, audit logging.
- **Academics Engine:** Grade point calculations, semester GPA weighting, cumulative CGPA, academic standing determinations (Dean's List, Good Standing, Academic Warning).
- **Email & Notification Engine:** PostgreSQL `email_log` recording in `dev` mode, Nodemailer dispatch in `smtp` mode, in-app notification badge counts.

### 3.2 Out-of-Scope Items
- High-volume DDoS simulation on live university infrastructure.
- Payment gateway stress testing (financial transactions are out of scope).

---

## 4. Test Methodology & Execution Process
1. **Static Analysis & Code Inspection:** Manual review of route authorization middleware (`auth()`), SQL parameterization, and DOM sanitization (`esc()` helper).
2. **Database Verification Scripts:** Automated verification of table schemas, constraints, foreign keys, and indexes via `verify-db.js`.
3. **Manual Functional Testing:** Role-based journey testing across Student, Lecturer, and Admin personas.
4. **Defect Tracking & Triage:** Classification of defects by severity (Critical, High, Medium, Low), documented in `docs/BUG_REPORTS.md`.
5. **Regression Verification:** Re-testing after defect resolution (e.g., verifying array handling in `student.js` after fix).

---

## 5. Pass / Fail Criteria
- **Pass Criteria:**
  - 100% of Critical and High severity test cases pass.
  - Zero SQL injection vulnerabilities or unauthenticated route leaks.
  - Academic GPA and CGPA calculations mathematically match official Africa University grading scale definitions.
  - Evidence file uploads enforce file signature validation and 4MB size boundaries.
  - Health endpoint returns `{"ok": true, "database": "connected"}`.
- **Fail Criteria:**
  - Any unauthorized user role is able to access admin endpoints (`/api/admin/*`).
  - Database deadlock or unhandled promise rejection during batch marks approval.
  - Runtime JavaScript exceptions thrown on frontend dashboards.
