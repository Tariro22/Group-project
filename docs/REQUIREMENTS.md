# StudentSphere — Software Requirements Specification (SRS)

## 1. Introduction
This Software Requirements Specification document describes the functional and non-functional requirements for the **StudentSphere** web platform at Africa University. It defines the system capabilities, constraints, interface requirements, and traceability matrix for all implemented features.

---

## 2. User Roles & Access Hierarchy
The system enforces strict Role-Based Access Control (RBAC) across three primary user roles:
1. **Student:** Enrolled student with verified registration credentials. Can view academic marks, GPA/CGPA, manage their portfolio (skills, projects, achievements), request recommendations, and receive notifications.
2. **Lecturer:** Academic faculty member. Can view assigned student profiles, evaluate recommendation requests, draft and release official letters, review and verify achievement claims, and record course marks.
3. **Administrator:** System administrator overseeing platform integrity. Can approve or reject new user registrations, assign students to primary lecturers, manage faculties and courses, approve academic result batches, inspect system audit logs, and monitor email delivery.

---

## 3. Functional Requirements

### 3.1 Authentication & Account Management (AUTH)
- **FR-AUTH-01:** The system shall allow students to register by providing Full Name, Student ID (6 digits), Email, Password, Faculty, Programme, and Year of Study.
- **FR-AUTH-02:** Student registrations shall be automatically verified against the institutional student roster (`student_roster` in Supabase) before registration completes.
- **FR-AUTH-03:** The system shall allow lecturers to register with their university email address, requiring administrator approval prior to login.
- **FR-AUTH-04:** Passwords shall be hashed using `bcryptjs` with a salt factor of 10. Passwords must be at least 8 characters with at least one number.
- **FR-AUTH-05:** Upon successful login, the system shall issue a signed JWT containing user ID, role, and email, with an expiry duration.
- **FR-AUTH-06:** The system shall provide a self-service password recovery mechanism (`/api/auth/forgot-password` and `/api/auth/reset-password`) using cryptographic single-use tokens expiring within 1 hour.

### 3.2 Student Profile & Portfolio (PROF)
- **FR-PROF-01:** Students shall be able to view and edit their profile details including headline, bio, skills, location, phone, and GitHub links.
- **FR-PROF-02:** Students shall be able to showcase personal projects (title, description, tech stack, live link).
- **FR-PROF-03:** Students shall be able to submit co-curricular achievements with title, category, issuer/organization, date, and description.
- **FR-PROF-04:** Students shall be able to upload up to 3 evidence files (PDF, PNG, JPEG, max 4MB per file) per achievement.
- **FR-PROF-05:** Achievements shall initialize in `pending` verification state and display a `VERIFIED` badge only upon lecturer approval.

### 3.3 Recommendation Request & Issuance Workflow (REC)
- **FR-REC-01:** Students shall be able to submit recommendation requests to their assigned lecturers, specifying the purpose and deadline.
- **FR-REC-02:** Lecturers shall receive immediate in-app and email notifications when a recommendation request is received.
- **FR-REC-03:** Lecturers shall be able to transition requests through the lifecycle: `pending` -> `under_review` -> `approved` / `declined` / `more_info_required` -> `completed`.
- **FR-REC-04:** When requesting more information, lecturers must provide a specific inquiry message; students can reply with additional details.
- **FR-REC-05:** When declining a request, lecturers must provide a formal decline explanation.
- **FR-REC-06:** Upon approval, lecturers shall have access to a rich drafting workbench to author, save drafts, and finalize the official recommendation letter.
- **FR-REC-07:** Lecturers can choose whether to release the final recommendation letter directly to the student portal (`release_to_student` toggle).

### 3.4 Academic Performance & GPA Engine (ACAD)
- **FR-ACAD-01:** Lecturers shall be able to record coursework, exam, and total marks for students in their assigned courses.
- **FR-ACAD-02:** Course marks must be submitted in batches for administrator review (`submitted` state).
- **FR-ACAD-03:** Administrators shall be able to approve or return result batches with explanatory comments.
- **FR-ACAD-04:** The system shall automatically compute letter grades and grade points based on the active university grading scale (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0).
- **FR-ACAD-05:** The system shall compute semester GPA (credit-weighted) and cumulative CGPA.
- **FR-ACAD-06:** The system shall determine academic standing: Dean's List ($\ge 3.50$), Good Standing ($\ge 2.00$), or Academic Warning ($< 2.00$).

### 3.5 Administrative Governance & Monitoring (ADMIN)
- **FR-ADMIN-01:** Administrators shall be able to activate, reject, or delete user accounts.
- **FR-ADMIN-02:** Administrators shall be able to assign students to primary and secondary lecturers.
- **FR-ADMIN-03:** Administrators shall manage the academic hierarchy: Faculties, Departments, and Courses.
- **FR-ADMIN-04:** The system shall record all significant security and operational actions into an immutable `audit_log` table.
- **FR-ADMIN-05:** The system shall log all generated notification emails in the `email_log` table with full HTML preview capability.

---

## 4. Non-Functional Requirements (NFR)

### 4.1 Usability & UX
- **NFR-USE-01:** The user interface shall adhere to Africa University's official brand identity (red accents, clean typography, Inter font family).
- **NFR-USE-02:** All user actions (success, errors, updates) shall provide immediate feedback via modal dialogs or animated toast alerts.

### 4.2 Responsiveness & Cross-Device Compatibility
- **NFR-RES-01:** The web portal shall render responsively across mobile screens ($\ge 320\text{px}$), tablets, and high-resolution desktop displays ($\ge 1920\text{px}$).
- **NFR-RES-02:** Mobile layouts shall provide an off-canvas drawer navigation menu accessible via hamburger button.

### 4.3 Security & Data Protection
- **NFR-SEC-01:** All database traffic shall be encrypted via TLS/SSL using Africa University's root CA certificate (`prod-ca-2021.crt`).
- **NFR-SEC-02:** Uploaded evidence files shall be stored outside the web root (`/var/data/uploads`) and served exclusively via authorized streaming endpoints.
- **NFR-SEC-03:** Uploaded files shall be inspected for genuine MIME signatures (magic bytes) to prevent executable payload uploads.
- **NFR-SEC-04:** Sensitive credentials (database connection strings, JWT secrets, SMTP passwords) must never be committed to Git or exposed in client bundles.

### 4.4 Reliability & Availability
- **NFR-REL-01:** The API server shall expose a `/api/health` monitoring endpoint confirming database responsiveness.
- **NFR-REL-02:** The system shall gracefully degrade email notifications in dev mode without aborting transaction workflows.

---

## 5. Requirements Traceability Matrix

| Requirement ID | Module | Primary Implementation File | Responsible Member | Status |
|---|---|---|---|---|
| FR-AUTH-01..05 | Authentication | `studentsphere/server.pg.js`, `public/js/auth.js` | Ashleigh / Rick | Verified |
| FR-AUTH-06 | Password Reset | `studentsphere/server.pg.js`, `studentsphere/mailer.js` | Ashleigh / Ian | Verified |
| FR-PROF-01..05 | Student Profile | `studentsphere/server.pg.js`, `public/js/student.js` | Deborah / Rick | Verified |
| FR-REC-01..07 | Recommendations | `studentsphere/server.pg.js`, `public/js/lecturer.js` | Deborah / Rick | Verified |
| FR-ACAD-01..06 | Academic Engine | `studentsphere/academics.postgres.js`, `public/js/academics.js` | Ian / Tariro | Verified |
| FR-ADMIN-01..05 | Admin Portal | `studentsphere/server.pg.js`, `public/js/admin.js` | Ashleigh / Rick / Ian | Verified |
| NFR-USE-01..02 | Styling & UI | `studentsphere/public/css/styles.css`, `public/js/ui.js` | Rick / Tariro | Verified |
| NFR-SEC-01..04 | Security & DB | `studentsphere/postgres.js`, `server.pg.js` | Ian / Ashleigh | Verified |
| NFR-REL-01..02 | Deployment & Health | `studentsphere/render.yaml`, `server.pg.js` | Ian | Verified |
