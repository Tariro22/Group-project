# StudentSphere — Comprehensive Software Test Cases

**QA Lead:** Ian Edson Mwashanja (`Ian-Edson-Mwashanja`)  
**Project:** Africa University Student Information, Portfolio & Recommendation System  
**Test Suite:** Functional, Security, Database & UI Tests

---

## 1. Authentication & Session Security (AUTH)

| Test ID | Module | Description | Preconditions | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|
| **TC-AUTH-01** | Auth | Student registration with valid roster ID | Valid 6-digit ID in `student_roster` | 1. Enter ID `220145`<br>2. Fill name, email, password<br>3. Submit | Auto-resolves details; creates active account | Account created; student dashboard accessible | **PASSED** |
| **TC-AUTH-02** | Auth | Student registration with invalid ID | ID `999999` not in roster | 1. Enter ID `999999`<br>2. Attempt submit | System rejects with 400 Bad Request error | Blocked with "Student ID not found in roster" | **PASSED** |
| **TC-AUTH-03** | Auth | Password complexity enforcement | User on signup page | 1. Enter password `short`<br>2. Attempt submit | Client and server block password (< 8 chars, no digit) | Blocked with validation message | **PASSED** |
| **TC-AUTH-04** | Auth | Lecturer signup pending approval | Unregistered AU email | 1. Fill lecturer form<br>2. Submit | Account created with status `pending`; cannot log in | Status set to `pending`; admin email queued | **PASSED** |
| **TC-AUTH-05** | Auth | Login with valid credentials | Active registered user | 1. Enter email and password<br>2. Submit | Returns signed JWT; navigates to role dashboard | JWT issued; correct dashboard rendered | **PASSED** |
| **TC-AUTH-06** | Auth | Login with invalid credentials | Registered user | 1. Enter email with wrong password | Returns 401 Unauthorized | Error "Invalid email or password" displayed | **PASSED** |
| **TC-AUTH-07** | Auth | Role-based route protection | Logged in as Student | 1. Direct fetch to `/api/admin/users`<br>with student JWT | Server responds with HTTP 403 Forbidden | Blocked with "You do not have permission" | **PASSED** |
| **TC-AUTH-08** | Auth | Self-service password recovery | Active user | 1. Submit email at `/forgot-password`<br>2. Open token link<br>3. Submit new password | Reset token generated; password updated in DB | Password updated; login with new password succeeds | **PASSED** |

---

## 2. Student Portfolio & Achievements (STUD)

| Test ID | Module | Description | Preconditions | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|
| **TC-STUD-01** | Student | Profile update | Logged in Student | 1. Go to Edit Profile<br>2. Change headline, skills, bio<br>3. Save | Profile updated in DB; reflected on profile view | Details saved and rendered immediately | **PASSED** |
| **TC-STUD-02** | Student | Add portfolio project | Logged in Student | 1. Go to Projects<br>2. Enter title, description, link<br>3. Save | Project added to `projects` table and displayed | Card rendered with working demo link | **PASSED** |
| **TC-STUD-03** | Student | Submit achievement with PDF evidence | Logged in Student | 1. Fill achievement form<br>2. Attach 1.2MB PDF certificate<br>3. Submit | File uploaded to persistent storage; status `pending` | Saved with pending status and file link | **PASSED** |
| **TC-STUD-04** | Student | Evidence file size limit enforcement | Logged in Student | 1. Attempt uploading 6MB file | Upload blocked by client and server (> 4MB) | Error "File exceeds 4MB limit" displayed | **PASSED** |
| **TC-STUD-05** | Student | Submit recommendation request | Assigned to Lecturer | 1. Go to Recommendations<br>2. Select lecturer, purpose, deadline<br>3. Submit | Request created with status `pending`; email logged | Status shows `pending`; lecturer notified | **PASSED** |

---

## 3. Lecturer Review & Verification Workflows (LEC)

| Test ID | Module | Description | Preconditions | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|
| **TC-LEC-01** | Lecturer | Review recommendation request | Pending request exists | 1. Open request details<br>2. Click "Mark Under Review" | Status transitions to `under_review` | Status updated; student notified | **PASSED** |
| **TC-LEC-02** | Lecturer | Request more information | Request under review | 1. Click "Request Info"<br>2. Enter question message<br>3. Submit | Status becomes `more_info_required`; prompt shown to student | Status updated; student can reply in portal | **PASSED** |
| **TC-LEC-03** | Lecturer | Draft and release recommendation letter | Approved request | 1. Edit letter text<br>2. Check "Release to student"<br>3. Submit | Status `completed`; letter released to student portal | Student can view, print, and save PDF letter | **PASSED** |
| **TC-LEC-04** | Lecturer | Verify student achievement | Pending achievement exists | 1. Open achievement verification<br>2. Review uploaded certificate<br>3. Click "Verify" | Status becomes `verified`; audit logged; student gets badge | `VERIFIED` badge visible on student profile | **PASSED** |
| **TC-LEC-05** | Lecturer | Reject achievement with reason | Pending achievement exists | 1. Select reject reason code<br>2. Provide review note<br>3. Submit | Status becomes `rejected`; explanation saved | Rejection reason recorded; student informed | **PASSED** |
| **TC-LEC-06** | Lecturer | Enter course marks and submit batch | Assigned course exists | 1. Enter coursework & exam marks<br>2. Click "Submit for Approval" | Marks status changes to `submitted` | Batch appears in admin approval queue | **PASSED** |

---

## 4. Academic Engine & Calculations (ACAD)

| Test ID | Module | Description | Preconditions | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|
| **TC-ACAD-01** | Academics | Grade scale mapping | Active grading scale | 1. Calculate mark = 85<br>2. Calculate mark = 72<br>3. Calculate mark = 55 | 85 -> Grade A (4.0 pts)<br>72 -> Grade B (3.0 pts)<br>55 -> Grade D (1.0 pts) | Correct grades and points assigned | **PASSED** |
| **TC-ACAD-02** | Academics | Weighted GPA computation | 3 approved courses | 1. Course 1: 3 credits, Grade A (4.0)<br>2. Course 2: 3 credits, Grade B (3.0)<br>3. Course 3: 4 credits, Grade C (2.0) | $\text{GPA} = \frac{12 + 9 + 8}{10} = 2.90$ | GPA computed as 2.90 | **PASSED** |
| **TC-ACAD-03** | Academics | Academic standing classification | Student with CGPA | 1. CGPA = 3.65<br>2. CGPA = 2.40<br>3. CGPA = 1.80 | 3.65 -> Dean's List<br>2.40 -> Good Standing<br>1.80 -> Academic Warning | Standing badges correctly rendered | **PASSED** |
| **TC-ACAD-04** | Academics | Batch marks approval by Admin | Submitted batch exists | 1. Admin reviews batch<br>2. Click "Approve Batch" | Marks status `approved`; student GPAs updated | Transaction committed; marks now official | **PASSED** |

---

## 5. Administrative Controls & Monitoring (ADMIN)

| Test ID | Module | Description | Preconditions | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|
| **TC-ADMIN-01**| Admin | Approve pending user account | Pending account exists | 1. Open Account Approvals<br>2. Click "Approve" | Account status set to `active`; welcome email logged | User can now authenticate successfully | **PASSED** |
| **TC-ADMIN-02**| Admin | Assign student to lecturer | Student & lecturer exist | 1. Select student and lecturer<br>2. Mark as primary<br>3. Save | Record created in `lecturer_assignments` | Student linked to lecturer workbench | **PASSED** |
| **TC-ADMIN-03**| Admin | Audit trail verification | System actions performed | 1. Open Audit Trail page | Action records displayed with timestamp and actor | All security and operational actions logged | **PASSED** |
| **TC-ADMIN-04**| Admin | Email log preview | Emails logged in dev mode | 1. Open Email Log<br>2. Click row | Modal displays full rendered HTML email | Email preview matches Africa University template | **PASSED** |

---

## 6. System Health & Infrastructure (INFRA)

| Test ID | Module | Description | Preconditions | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|
| **TC-INFRA-01**| Infra | Health endpoint check | PostgreSQL online | 1. Send GET to `/api/health` | Returns HTTP 200 `{"ok":true,"database":"connected"}` | Response: `{"ok":true,"database":"connected"}` | **PASSED** |
| **TC-INFRA-02**| Infra | Database pool connection test | Network access enabled | 1. Execute `node verify-db.js` | Connects with CA cert; logs user and academic counts | Output verified: 5 users, 20 tables connected | **PASSED** |
