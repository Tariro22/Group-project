# StudentSphere — User Stories & Acceptance Criteria

This document details the user stories and acceptance criteria implemented in **StudentSphere**, structured by persona and agile epic.

---

## 1. Epic: Authentication & Access Control

### US-AUTH-01: Student Registration Verification
- **As a** prospective student,
- **I want to** register for an account using my 6-digit Africa University Student ID,
- **So that** my account is automatically verified against official institutional records.
- **Acceptance Criteria:**
  - Given a valid, unclaimed 6-digit student ID present in the Supabase roster, when the student enters their ID, their full name, programme, and faculty are auto-resolved and verified.
  - If the ID does not exist in the roster, the system prevents registration with an informative error message.
  - If the student ID is already registered to another active account, registration is blocked.
  - The student's chosen password must meet security complexity rules ($\ge 8$ chars, numeric digit).

### US-AUTH-02: Role-Based Secure Login
- **As a** registered university user (Student, Lecturer, Admin),
- **I want to** authenticate using my email and password,
- **So that** I receive a secure session token granting access only to my role's dashboard.
- **Acceptance Criteria:**
  - Upon valid credentials, the API returns a signed JWT token containing user identity and role.
  - Inactive or rejected accounts are denied access with an appropriate message.
  - Attempts to access unauthorized routes (e.g., student accessing `/admin/*`) return an HTTP 403 Forbidden.

### US-AUTH-03: Self-Service Password Recovery
- **As a** user who forgot my password,
- **I want to** request a password reset link to my registered email address,
- **So that** I can securely regain access to my account without administrative intervention.
- **Acceptance Criteria:**
  - Submitting an email generates a cryptographically secure random token stored in `password_reset_tokens` with a 1-hour expiration.
  - In production mode, an email is dispatched via Nodemailer containing a reset link. In dev mode, the event is logged in `email_log`.
  - The reset form validates password complexity and marks the token as used upon successful update.

---

## 2. Epic: Student Portal & Portfolio

### US-STUD-01: Academic Dashboard & GPA Tracking
- **As a** student,
- **I want to** view my semester marks, credits earned, and cumulative GPA,
- **So that** I can track my academic standing and eligibility for university honors.
- **Acceptance Criteria:**
  - Displays semester-by-semester course marks, letter grades (A–F), and credit points.
  - Displays computed semester GPA and cumulative CGPA.
  - Correctly flags academic standing: *Dean's List* ($\text{CGPA} \ge 3.50$), *Good Standing* ($\text{CGPA} \ge 2.00$), or *Academic Warning* ($\text{CGPA} < 2.00$).

### US-STUD-02: Portfolio & Project Showcase
- **As a** student,
- **I want to** publish technical and creative projects with live demo links,
- **So that** prospective employers and lecturers reviewing my recommendations can assess my skills.
- **Acceptance Criteria:**
  - Form allows entering project title, description, technology stack tags, and external URL.
  - Projects are dynamically rendered in card format with delete controls for the author.

### US-STUD-03: Achievement Submission with File Evidence
- **As a** student,
- **I want to** upload certificates and awards with supporting PDF/image documents,
- **So that** a lecturer can formally review and verify my co-curricular accomplishments.
- **Acceptance Criteria:**
  - Form supports title, category (academic, award, leadership, etc.), issuer, date, and description.
  - Supports uploading up to 3 evidence files (PDF, PNG, JPG, max 4MB each).
  - Newly submitted achievements display status *Pending Verification*.
  - When verified by a lecturer, the achievement displays a green `VERIFIED` badge.

### US-STUD-04: Recommendation Letter Requests
- **As a** student,
- **I want to** submit a recommendation letter request to my assigned lecturer,
- **So that** I can obtain an official academic or employment recommendation.
- **Acceptance Criteria:**
  - Allows selecting from assigned lecturers, entering the purpose/organization, and setting an application deadline.
  - Displays real-time request status: `Pending`, `Under Review`, `Approved`, `Declined`, `More Information Required`, or `Completed`.
  - If a lecturer requests more information, the student can submit a response directly within the portal.
  - If the lecturer releases the finalized letter, the student can view and print/download the official recommendation document.

---

## 3. Epic: Lecturer Portal & Academic Workflow

### US-LEC-01: Recommendation Workbench
- **As a** lecturer,
- **I want to** inspect incoming recommendation requests with full student context,
- **So that** I can make informed evaluation decisions.
- **Acceptance Criteria:**
  - Request review drawer displays student GPA, courses taken, verified achievements, and projects.
  - Lecturer can mark request as *Under Review*.
  - Lecturer can *Approve*, *Decline* (with mandatory reason), or *Request More Information*.
  - Upon approval, opens a drafting interface populated with standard Africa University recommendation templates.
  - Lecturer can save drafts and choose whether to release the final letter to the student.

### US-LEC-02: Achievement Verification Workbench
- **As a** lecturer,
- **I want to** review student achievement claims and download attached evidence files,
- **So that** only legitimate accomplishments receive Africa University verification.
- **Acceptance Criteria:**
  - Lists all pending achievements submitted by assigned students.
  - Allows secure preview/download of uploaded certificate files.
  - Lecturer can *Verify*, *Reject* (with formal reason code), or *Request Additional Evidence*.
  - Action writes an immutable audit record to `achievement_verifications`.

### US-LEC-03: Course Marks Entry
- **As a** course lecturer,
- **I want to** enter coursework and exam scores for enrolled students,
- **So that** official results can be compiled and submitted for administrative approval.
- **Acceptance Criteria:**
  - Renders student list for the lecturer's assigned course.
  - Validates numeric coursework ($\le 50$) and exam ($\le 50$) marks.
  - Computes total mark and tentative grade automatically.
  - Provides a *Submit for Approval* action changing marks status to `submitted`.

---

## 4. Epic: Administrator Portal & Governance

### US-ADM-01: Account Approval Queue
- **As a** system administrator,
- **I want to** review newly registered lecturer and student accounts,
- **So that** only verified university personnel access the portal.
- **Acceptance Criteria:**
  - Displays pending accounts with full name, email, role, and registration timestamp.
  - Administrator can activate or reject accounts with an explanatory reason.
  - Action triggers an automated email notification to the applicant.

### US-ADM-02: Lecturer-Student Assignments
- **As an** administrator,
- **I want to** assign students to primary academic advisors/lecturers,
- **So that** recommendation requests and achievement verifications route to the appropriate faculty member.
- **Acceptance Criteria:**
  - Interface allows selecting student and lecturer, marking assignment as primary.
  - Prevents orphaned students and supports reassignments.

### US-ADM-03: Academic Marks Batch Approval
- **As an** administrator (Registrar),
- **I want to** review mark batches submitted by lecturers,
- **So that** official grades are verified before updating student transcripts.
- **Acceptance Criteria:**
  - Displays batch summary: course code, semester, lecturer, student count, average mark.
  - Administrator can *Approve Batch* (changes marks status to `approved`, immediately recalculating student GPAs in an atomic database transaction).
  - Administrator can *Return Batch* with feedback to the lecturer for adjustments.

### US-ADM-04: System Monitoring & Audit Trail
- **As an** administrator,
- **I want to** inspect system audit logs and email delivery records,
- **So that** platform integrity and compliance are maintained.
- **Acceptance Criteria:**
  - Audit log table displays timestamp, actor ID/email, action type, IP address, and payload details.
  - Email log table displays recipient, subject, status (`dev`, `sent`, `failed`, `skipped`), and opens full HTML email previews in a modal dialog.
