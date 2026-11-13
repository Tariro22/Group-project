# StudentSphere — Group Project Contribution & Workload Distribution

## 1. Project Introduction
**StudentSphere** is a centralized, role-based academic portal developed for **Africa University**. The platform provides secure, dedicated portals for **Students**, **Lecturers**, and **System Administrators**, facilitating academic performance monitoring, semester course marks recording, GPA/CGPA computation, achievement evidence verification with secure upload handling, streamlined recommendation letter workflows, and automated email notifications.

The application is built on a production-ready stack comprising **Node.js/Express**, **Supabase PostgreSQL** (using SSL CA encryption), **Vanilla JavaScript (ES Modules)**, and **CSS3**, deployed on **Render** with persistent cloud storage for verification documents.

---

## 2. Group Roster & Official Role Summary

| Member Name | GitHub Username | University Email | Official Role | Primary Module Focus |
|---|---|---|---|---|
| **Tariro Nichole Tekwa** | `Tariro22` | `tekwat@africau.edu` | Project Manager / System Analyst / Frontend Developer | Project Proposal, Requirements, Stakeholder Analysis, Frontend Performance & Notifications |
| **Ashleigh Gopo** | `ashblonde` | `gopoa@africau.edu` | Backend Developer | Authentication, User Management, Roster Verification & Server-Side Validation |
| **Deborah Dimas Amos** | `Deborah-Dimas-Amos` | `dimasd@africau.edu` | Backend Developer | Recommendation Approval Workflows, Letter Generation, Achievement Backend & File Streaming |
| **Rick Afonso Gove** | `rickafonsogove-cloud` | `rickafonsogove@gmail.com` | Frontend Developer | Multi-Portal Dashboards, UI/UX Design System, CSS Styling & Responsive Navigation |
| **Ian Edson Mwashanja** | `Ian-Edson-Mwashanja` | `ianedson988@africau.edu` | QA / Documentation / Deployment / Backend & Database Developer | Supabase PostgreSQL Architecture, Academics/GPA Backend Engine, Mailer, Deployment & QA Suite |

---

## 3. Detailed Workload & Contribution Breakdown

### Member 1: Tariro Nichole Tekwa
- **GitHub Username:** `Tariro22`
- **Official Role:** Project Manager / System Analyst / Frontend Developer
- **Assigned Modules:**
  - Project Management & Requirements Engineering
  - Stakeholder Identification & Communication Strategy
  - Agile Sprint Planning, Meeting Records & Traceability
  - Frontend Student Academic Performance & Notifications Integration
- **Actual Files Associated:**
  - `docs/PROJECT_PROPOSAL.md`
  - `docs/REQUIREMENTS.md`
  - `docs/STAKEHOLDER_ANALYSIS.md`
  - `docs/USER_STORIES.md`
  - `docs/MEETING_MINUTES.md`
  - `studentsphere/public/js/academics.js` (`studentExtra` view)
  - `studentsphere/public/js/shared.js` (`notificationsPage`)
- **Specific Components & Functions:**
  - Project scope definition, functional/non-functional requirements matrix, and team deliverables coordination.
  - User story authoring across Student, Lecturer, and Admin personas with acceptance criteria.
  - `studentExtra` in `public/js/academics.js`: `performance(main)` and `results(main)` views for student semester results and GPA rendering.
  - `notificationsPage(main)` in `public/js/shared.js`: In-app notification viewer, unread badge counter, and mark-as-read API integration.
- **Expected Deliverables:** Approved proposal, stakeholder analysis, requirements specification, sprint logs, student academic UI components.
- **Testing Responsibilities:** Usability testing across student academic views, navigation consistency, acceptance criteria verification.
- **Integration Responsibilities:** Aligning business requirements with API contracts; coordinating review sessions between frontend and backend developers.

---

### Member 2: Ashleigh Gopo
- **GitHub Username:** `ashblonde`
- **Official Role:** Backend Developer
- **Assigned Modules:**
  - User Authentication, Registration & Session Management
  - Student Roster Integration & Server-Side Identity Verification
  - Password Reset Request & Token Expiry Security
  - Administrator User Management API
  - Initial Relational Database Schema Design
- **Actual Files Associated:**
  - `studentsphere/server.pg.js` (Lines 384–590, 774–930, 1769–2039)
  - `studentsphere/supabaseRoster.js`
  - `database/schema.sql`
  - `docs/images/ERD.png`
- **Specific Components & Functions:**
  - `app.post("/api/auth/register")`: Multi-role registration, bcrypt password hashing, input sanitization, and automatic matching with official student roster records.
  - `app.post("/api/auth/login")`: Credential validation, active account status checks, and JWT token issuance.
  - `app.post("/api/auth/forgot-password")` & `app.post("/api/auth/reset-password")`: Secure crypto token generation, single-use token lifecycle, expiry validation, and password hash reset.
  - `app.get("/api/admin/users")`, `app.put("/api/admin/users/:id")`, `app.post("/api/admin/users/:id/reject")`: Administrative account activation and role governance.
  - `lookupStudent(studentId)` & `maskEmail(email)` in `supabaseRoster.js`: Supabase REST API connection for institutional roster verification.
  - `database/schema.sql`: Initial SQL DDL schema design and entity relationship diagram (`docs/images/ERD.png`).
- **Expected Deliverables:** Secure authentication endpoints, session token handling, roster lookup validation, account recovery workflows, schema DDL.
- **Testing Responsibilities:** Unit and integration testing of login/registration edge cases, invalid tokens, password complexity enforcement, and SQL injection prevention.
- **Integration Responsibilities:** Coordinating JWT payload conventions with frontend API client (`public/js/api.js`) and middleware authorizers.

---

### Member 3: Deborah Dimas Amos
- **GitHub Username:** `Deborah-Dimas-Amos`
- **Official Role:** Backend Developer
- **Assigned Modules:**
  - Recommendation Request & Lifecycle State Machine
  - Lecturer Letter Generation, Drafting & Release Logic
  - Student Achievement Submission & Evidence Handling
  - Lecturer Achievement Verification Engine
  - Secure File Streaming & Ownership Authorization
- **Actual Files Associated:**
  - `studentsphere/server.pg.js` (Lines 1187–1729, 2769–3133, 3213–3276)
  - `studentsphere/public/js/student.js` (Defensive profile array handling fixes)
- **Specific Components & Functions:**
  - `app.get("/api/recommendations")` & `app.post("/api/recommendations")`: Recommendation dispatch with lecturer assignment and purpose validation.
  - `app.put("/api/recommendations/:id")`: Full 6-stage lifecycle transitions (`pending` -> `under_review` -> `approved` -> `declined` -> `more_info_required` -> `completed`), custom letter drafting, and student release permissions.
  - `app.put("/api/recommendations/:id/info")`: Student response submission to lecturer clarification inquiries.
  - `app.post("/api/me/achievements")` & `app.put("/api/achievements/:id/review")`: Achievement lifecycle management (verification, rejection with formal reason codes, additional evidence requests).
  - `app.get("/api/files/:id")`: Secure evidence streaming endpoint with strict MIME validation and ownership verification.
  - Array safety fixes in `public/js/student.js` (`asArray` utility integration preventing runtime errors when rendering profile sub-entities).
- **Expected Deliverables:** End-to-end recommendation request engine, letter drafting tools, achievement verification workflows, secure file downloads.
- **Testing Responsibilities:** Workflow testing of recommendation state transitions, letter release toggles, file size and format validation, and unauthorized file access prevention.
- **Integration Responsibilities:** Interfacing letter drafting and achievement endpoints with Rick's lecturer and student frontend forms.

---

### Member 4: Rick Afonso Gove
- **GitHub Username:** `rickafonsogove-cloud`
- **Official Role:** Frontend Developer
- **Assigned Modules:**
  - User Interface Architecture & Design System (AU Brand Theme)
  - Student Portal Views & Dynamic Portfolio Management
  - Lecturer Portal Views & Review Workbenches
  - Administrator Portal Views & System Monitoring Interfaces
  - Responsive Navigation Shell & UI Utility Library
- **Actual Files Associated:**
  - `studentsphere/public/css/styles.css`
  - `studentsphere/public/js/auth.js`
  - `studentsphere/public/js/student.js`
  - `studentsphere/public/js/lecturer.js`
  - `studentsphere/public/js/admin.js`
  - `studentsphere/public/js/ui.js`
- **Specific Components & Functions:**
  - `styles.css`: Complete CSS styling, responsive breakpoints, drawer transitions, card layouts, form inputs, typography, and status tags.
  - `auth.js`: Interactive forms for `loginPage`, `signupPage`, `forgotPasswordPage`, and `resetPasswordPage` with live roster feedback.
  - `student.js`: Student dashboard, full profile view, profile editor, projects showcase, and achievement submission with drag-and-drop evidence uploads.
  - `lecturer.js`: Lecturer dashboard with KPI statistics, student profile inspector, recommendation request review workbench, and achievement verification modal.
  - `admin.js`: Comprehensive admin dashboard, user table, account approval cards, lecturer assignment management, and audit log table.
  - `ui.js`: Reusable UI primitives including `modal()`, `toast()`, `field()`, `pwField()`, `select()`, `statCard()`, and `verifiedBadge()`.
- **Expected Deliverables:** Polished, responsive web interfaces for all three user roles, consistent styling, mobile navigation drawer, interactive form feedback.
- **Testing Responsibilities:** Cross-browser compatibility testing (Chrome, Firefox, Safari, Edge), responsive layout testing across mobile/tablet/desktop, accessibility audit.
- **Integration Responsibilities:** Binding frontend event listeners and form handlers to backend REST endpoints via `api.js`.

---

### Member 5: Ian Edson Mwashanja
- **GitHub Username:** `Ian-Edson-Mwashanja`
- **Official Role:** Quality Assurance / Documentation / Deployment / Backend & Database Developer
- **Assigned Modules:**
  - PostgreSQL Database Architecture & Supabase Migration
  - Academic Backend Engine, Grading Scales & GPA Computation
  - Automated Email Notification & PostgreSQL Logging System
  - Cloud Deployment Configuration & Persistent Storage Setup
  - Comprehensive QA Test Suite, User Manual & Technical Documentation
- **Actual Files Associated:**
  - `studentsphere/postgres.js`
  - `studentsphere/academics.postgres.js`
  - `studentsphere/mailer.js`
  - `studentsphere/render.yaml`
  - `studentsphere/DEPLOY.md` & `docs/DEPLOYMENT_GUIDE.md`
  - `docs/TEST_PLAN.md`, `docs/TEST_CASES.md`, `docs/BUG_REPORTS.md`
  - `docs/USER_MANUAL.md`
  - `README.md` & `GROUP_CONTRIBUTIONS.md`
- **Specific Components & Functions:**
  - `postgres.js`: Supabase PostgreSQL pool architecture, CA-signed SSL security (`prod-ca-2021.crt`), connection failover, and transaction management across 20 relational tables.
  - `mountAcademics()` in `academics.postgres.js`: Course marks entry, batch approvals (`/api/admin/results/approve`), return workflows (`/api/admin/results/return`), grading scale logic, weighted GPA calculation, and CGPA transcript generation.
  - `mailer.js`: Dual-mode email engine (`dev` mode PostgreSQL logging in `email_log` vs `smtp` mode via Nodemailer) with branded HTML email templates.
  - `render.yaml`: Blueprint orchestration for Render deployment, environment variables, health check endpoint (`/api/health`), and persistent disk mount for uploads.
  - Quality assurance testing execution, automated smoke testing, comprehensive test plan, test cases, bug reports, and user manuals.
- **Expected Deliverables:** High-availability database connectivity, academic calculation backend, working email system, deployment automation, complete QA documentation.
- **Testing Responsibilities:** End-to-end backend integration tests, database transaction integrity tests, load/stress checks, deployment health check verification.
- **Integration Responsibilities:** Coordinating database migrations, managing cloud hosting environment, verifying API reliability across all subsystems.

---

## 4. Comprehensive Contribution Matrix

| System Module / Capability | Primary Owner | Supporting Developer | Key Files Involved | Deliverable Output |
|---|---|---|---|---|
| **Project Initiation & Scope** | Tariro | Ian | `docs/PROJECT_PROPOSAL.md`, `docs/REQUIREMENTS.md` | Formal project specification & scope |
| **Stakeholder Analysis** | Tariro | Rick | `docs/STAKEHOLDER_ANALYSIS.md` | Stakeholder engagement matrix |
| **Agile Sprints & Minutes** | Tariro | Rick | `docs/MEETING_MINUTES.md`, `docs/USER_STORIES.md` | Sprint backlog, stories, meeting logs |
| **Authentication Backend** | Ashleigh | Ian | `studentsphere/server.pg.js`, `studentsphere/supabaseRoster.js` | JWT login, register, password recovery |
| **User Administration API** | Ashleigh | Deborah | `studentsphere/server.pg.js` | Account activation, reject, delete |
| **Relational Database Design** | Ashleigh | Ian | `database/schema.sql`, `docs/images/ERD.png` | Initial ERD & DDL schema |
| **Recommendation Engine** | Deborah | Ashleigh | `studentsphere/server.pg.js` | Request, review, draft & letter release |
| **Achievement Workflow Backend**| Deborah | Rick | `studentsphere/server.pg.js` | Achievement review & evidence verification |
| **File Storage & Security API**| Deborah | Ian | `studentsphere/server.pg.js` | Secure evidence uploads & streaming |
| **Client Authentication UI** | Rick | Ashleigh | `studentsphere/public/js/auth.js` | Login, signup & password reset forms |
| **Dashboards & Navigation** | Rick | Tariro | `studentsphere/public/js/student.js`, `lecturer.js`, `admin.js` | Multi-portal responsive dashboard UI |
| **Styling & Design System** | Rick | Tariro | `studentsphere/public/css/styles.css`, `public/js/ui.js` | CSS design system, modals, toasts |
| **Student Academics Frontend** | Tariro | Rick | `studentsphere/public/js/academics.js`, `public/js/shared.js` | Student results tables, GPA, notifications |
| **Database Architecture (Pg)** | Ian | Ashleigh | `studentsphere/postgres.js`, `studentsphere/verify-db.js` | Supabase 20-table schema & pool |
| **Academics & GPA Engine** | Ian | Deborah | `studentsphere/academics.postgres.js` | Marks entry, batch approval, GPA engine |
| **Email Notification Engine** | Ian | Ashleigh | `studentsphere/mailer.js` | SMTP Nodemailer & PostgreSQL dev log |
| **Cloud Deployment Config** | Ian | Rick | `studentsphere/render.yaml`, `docs/DEPLOYMENT_GUIDE.md` | Render Web Service & Persistent Disk |
| **QA Test Suite & Manuals** | Ian | Tariro | `docs/TEST_PLAN.md`, `docs/TEST_CASES.md`, `docs/USER_MANUAL.md` | Comprehensive QA reports & user guides |

---

## 5. Verification & Academic Integrity Declaration
This workload allocation represents the collaborative distribution of effort across all five group members. Each member is responsible for committing and maintaining their respective modules in the official GitHub repository (`https://github.com/Tariro22/Group-project`), adhering to the testing, documentation, and review protocols established herein.
