# StudentSphere — Comprehensive User Manual & Operations Guide

**Application:** StudentSphere (Africa University Academic & Recommendation Portal)  
**Target Roles:** Students, Academic Lecturers, System Administrators  
**URL:** Deployed on Render / Local `http://localhost:3000`

---

## 1. System Overview
**StudentSphere** is Africa University's official platform for managing student academic performance, verifying co-curricular achievements, and streamlining recommendation letter workflows. The system provides dedicated interfaces tailored to three user roles: **Student**, **Lecturer**, and **Administrator**.

---

## 2. Getting Started & Account Registration

### 2.1 Student Registration
1. Navigate to the portal homepage and click **Sign Up**.
2. Select the **Student** role.
3. Enter your **6-digit Africa University Student ID** (e.g., `220145`). The system will automatically check the official student roster and verify your enrolment details.
4. Provide your university email address (`@student.africau.edu`), full name, faculty, programme, and year of study.
5. Create a secure password (minimum 8 characters, containing at least one numeric digit).
6. Click **Create Student Account**. Upon registration, you are immediately logged into your Student Dashboard.

### 2.2 Lecturer Registration
1. On the registration page, select the **Lecturer** role.
2. Enter your full name, official Africa University email address (`@africau.edu`), and choose a secure password.
3. Click **Register as Lecturer**.
4. *Important:* New lecturer registrations are held in a pending queue for security review. A System Administrator will review and activate your account before you can log in.

### 2.3 Password Recovery
1. If you forget your password, click **Forgot Password?** on the login screen.
2. Enter your registered university email address.
3. The system generates a secure single-use recovery link valid for 1 hour.
4. Click the link received in your email (or previewed in Admin Email Log in dev mode), enter your new password, and submit to regain access.

---

## 3. Student Portal Guide

### 3.1 Student Dashboard & Profile
- **Overview:** Displays quick stats: Cumulative GPA, verified achievements count, pending recommendation requests, and notifications.
- **My Profile:** View your academic headline, bio, skills, enrolled programme, and public portfolio.
- **Edit Profile:** Update your bio, technical skills (comma-separated), location, phone number, and GitHub URL.

### 3.2 Academic Performance & Results
- Click **My Results** or **Academic Performance** in the navigation menu.
- View official course marks: Course Code, Course Title, Coursework Score, Exam Score, Total Score, Letter Grade, and Credits.
- Inspect semester-by-semester GPA and your overall **Cumulative CGPA**.
- Check your official academic standing badge (*Dean's List*, *Good Standing*, or *Academic Warning*).

### 3.3 Submitting Co-Curricular Achievements
1. Navigate to **Achievements** and click **＋ Add Achievement**.
2. Enter the **Title** (e.g., "Presidential Leadership Award"), **Category** (Academic, Leadership, Award, Certification), **Organization / Issuer**, and **Date**.
3. Provide a detailed description of the accomplishment.
4. Attach up to **3 supporting evidence files** (PDF, PNG, JPEG up to 4MB per file).
5. Click **Submit Achievement**. The achievement is saved with status `Pending Verification` until verified by your lecturer.
6. Once approved, a green **`VERIFIED`** badge will appear alongside your achievement.

### 3.4 Requesting a Recommendation Letter
1. Navigate to **Recommendations** and click **Request Recommendation**.
2. Select your assigned lecturer from the dropdown.
3. Specify the **Purpose** (e.g., "Master's Degree Application at Oxford", "Software Engineering Internship").
4. Specify the **Submission Deadline**.
5. Click **Submit Request**.
6. Track the status on your dashboard:
   - `Pending`: Request delivered to lecturer.
   - `Under Review`: Lecturer is reviewing your academic transcript and portfolio.
   - `More Information Required`: Lecturer sent an inquiry; click **Respond** to provide details.
   - `Completed`: Lecturer has finalized the letter. If released, click **View Letter** to view and print your official signed recommendation letter.

---

## 4. Lecturer Portal Guide

### 4.1 Lecturer Dashboard
- View key metrics: Pending recommendation requests, achievements awaiting verification, and assigned students.
- Quick-access cards display items requiring immediate faculty attention.

### 4.2 Handling Recommendation Requests
1. Navigate to **Recommendation Requests**.
2. Click any pending request to open the evaluation workbench.
3. Review the student's complete academic record: GPA, course history, verified achievements, and projects.
4. Available Actions:
   - **Mark Under Review:** Signals to the student that their application is being evaluated.
   - **Request More Info:** Enter an inquiry prompt if you need additional context from the student.
   - **Decline:** Enter a formal decline explanation if unable to recommend.
   - **Approve & Draft Letter:** Opens the recommendation drafting interface.
5. In the drafting editor, customize the letter text using Africa University's official template.
6. Choose whether to check the **Release letter to student** toggle.
7. Click **Complete Recommendation** to finalize.

### 4.3 Verifying Student Achievements
1. Navigate to **Achievement Verification**.
2. Review the list of achievements submitted by students assigned to you.
3. Click an achievement to inspect the description and click attached evidence files to download/preview certificates.
4. Actions:
   - **Verify:** Approves the achievement and grants the student an official `VERIFIED` badge.
   - **Reject:** Select a formal reason code and provide feedback explaining why the evidence was insufficient.
   - **Request Evidence:** Ask the student to upload clearer or additional proof.

### 4.4 Recording Course Marks
1. Navigate to **Course Marks**.
2. Select your assigned course and semester.
3. Enter **Coursework Marks** (out of 50) and **Exam Marks** (out of 50) for each enrolled student.
4. Total marks and letter grades are calculated in real time.
5. Click **Submit Marks for Approval** to forward the batch to the Registrar / Administrator.

---

## 5. Administrator Portal Guide

### 5.1 Account Approvals & User Governance
- **Account Approvals:** Review new lecturer registration requests; click **Approve** to activate or **Reject** with a reason.
- **User Management:** Search and filter all registered users, view roles, update account statuses (`active`, `suspended`), or delete accounts.

### 5.2 Lecturer-Student Assignments
- Navigate to **Lecturer Assignments**.
- Select a student and assign them to a primary faculty advisor.
- Secondary advisors can also be linked for specialized academic projects.

### 5.3 Results Batch Approval & GPA Recalculation
1. Navigate to **Results & GPA**.
2. Inspect batches of marks submitted by course lecturers.
3. Review class averages, grade distributions, and mark entries.
4. Click **Approve Batch**:
   - Updates marks status to `approved`.
   - Triggers automated GPA/CGPA recalculations for all students in the batch inside an atomic database transaction.
5. Alternatively, click **Return Batch** with feedback to send marks back to the lecturer for revisions.

### 5.4 Email Log & System Audit Trail
- **Email Log:** Inspect all notification emails generated by the system. Click any row to preview the complete HTML layout sent to users.
- **Audit Trail:** View an immutable chronological log of administrative and security events (logins, password changes, approvals, grade updates) with timestamps and actor details.

---

## 6. Frequently Asked Questions (FAQ)

**Q: Why does my achievement show "Pending Verification"?**  
*A:* All achievements require review by your assigned lecturer to prevent unverified claims. Once your lecturer reviews your uploaded certificate, the status changes to `VERIFIED`.

**Q: Can I change my password?**  
*A:* Yes. Go to **Settings -> Password & Security**, enter your current password, type your new password, and click **Update Password**.

**Q: Why haven't I received an email in development mode?**  
*A:* When running locally with `MAIL_MODE=dev`, emails are stored safely in the database rather than sent over the internet. Administrators can view the full HTML email under **Admin Portal -> Email Log**.

**Q: How do I export or print my recommendation letter?**  
*A:* Open the completed recommendation in your student portal, click **View Letter**, and use your browser's Print function (**Ctrl+P** or **Cmd+P**) to print or select **Save as PDF**.
