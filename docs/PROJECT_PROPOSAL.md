# StudentSphere — Project Proposal
**Africa University Student Information, Portfolio & Recommendation System**

## 1. Executive Summary
Higher education institutions require robust digital platforms to streamline academic records, document extra-curricular achievements, and facilitate academic recommendations. At Africa University, students often face challenges when requesting recommendation letters from lecturers, tracking academic progress across semesters, and showcasing authenticated non-academic accomplishments. 

**StudentSphere** bridges these gaps by providing a unified, role-based web application connecting Students, Lecturers, and System Administrators. The platform centralizes profile management, course mark processing, GPA/CGPA calculations, evidence-based achievement verification, and a multi-stage recommendation workflow with automated email notifications.

---

## 2. Problem Statement
1. **Inefficient Recommendation Workflows:** Students traditionally request recommendation letters via manual emails or paper forms, leading to lost requests, delayed responses, and lack of tracking. Lecturers lack direct, verified summaries of student academic and co-curricular achievements when drafting letters.
2. **Dispersed Academic & Achievement Records:** Academic marks, semester transcripts, and verified co-curricular achievements (awards, certifications, leadership) are managed in disparate systems or paper files, making holistic performance reviews difficult.
3. **Unverified Achievement Claims:** Extra-curricular achievements submitted by students often lack formal lecturer verification or cryptographic file evidence, undermining institutional credibility.
4. **Administrative Overhead:** Administrators face high friction managing user credentials, manually enrolling students, approving lecturer assignments, and tracking audit logs.

---

## 3. Project Objectives
- **Centralize Student Records:** Provide students with a real-time dashboard displaying verified academic marks, GPA/CGPA calculations, and approved achievements.
- **Streamline Recommendation Letters:** Implement an end-to-end request lifecycle (`pending` -> `under_review` -> `approved` -> `declined` -> `more_info_required` -> `completed`) with draft management and official release controls.
- **Implement Evidence-Based Achievement Verification:** Enable students to submit achievement records with document evidence (certificates, letters), requiring lecturer review before earning an official `VERIFIED` badge.
- **Enhance Security and Governance:** Implement role-based access control (RBAC), bcrypt password encryption, JWT authentication, server-side student roster verification, and detailed audit logging.
- **Deliver Cloud-Ready Deployment:** Deploy a production-grade application on Render backed by Supabase PostgreSQL with automated SSL encryption and persistent storage.

---

## 4. Project Scope
### In Scope:
- Multi-role web portal (Student, Lecturer, Administrator).
- User authentication, registration verification via institutional roster, and self-service password recovery.
- Student profile editing (headline, bio, skills, projects, contact details).
- Academic module: course marks, grading scale, semester GPA and cumulative CGPA calculation.
- Achievement submission with multi-file evidence upload (PDF/PNG/JPEG up to 4MB).
- Recommendation request submission, lecturer drafting interface, decline reasons, and student release toggles.
- Lecturer course marks entry and administrator batch marks approval.
- Administrator user governance, lecturer assignments, email preview logs, and system audit trails.
- Automated email notifications (dual-mode: dev mode logging + SMTP production delivery).

### Out of Scope:
- Direct financial billing or tuition fee processing.
- Real-time video conferencing for advising sessions.
- Native mobile application distribution (handled via responsive web design).

---

## 5. System Architecture & Tech Stack
- **Frontend:** Responsive Single Page Application (SPA) using vanilla HTML5, CSS3 (AU brand guidelines), and modern ES Modules (no bulky framework dependencies).
- **Backend:** Node.js with Express RESTful API, structured error middleware, rate limiting, and input sanitization.
- **Database:** Supabase PostgreSQL with SSL CA certificate validation (`prod-ca-2021.crt`), connection pooling, and 20 relational tables.
- **File Storage:** Secure persistent cloud storage on Render (`/var/data/uploads`) with server-side MIME type sniffing and ownership checks.
- **Email Service:** Nodemailer with fallback PostgreSQL logging (`email_log`) for local testing.

---

## 6. Project Timeline & Milestones
- **Milestone 1 (Requirements & UI Design):** Stakeholder analysis, requirements specification, Figma wireframing, and team role allocation.
- **Milestone 2 (Database & Prototype Backend):** Initial relational schema design, SQLite prototype, user authentication, and basic CRUD operations.
- **Milestone 3 (PostgreSQL Migration & Workflows):** Supabase PostgreSQL migration, recommendation lifecycle state machine, achievement verification engine, and academics/GPA module.
- **Milestone 4 (Security, Mailer & Cloud Deployment):** Password recovery, Nodemailer integration, Render Blueprint configuration, persistent storage mounting, and SSL enforcement.
- **Milestone 5 (QA, Documentation & Submission):** Comprehensive automated and manual testing, bug triage, user manual creation, workload distribution documentation, and official GitHub publication.

---

## 7. Project Team & Official Roles
- **Tariro Nichole Tekwa (`Tariro22`):** Project Manager / System Analyst / Frontend Developer
- **Ashleigh Gopo (`ashblonde`):** Backend Developer (Authentication, User Management, Validation)
- **Deborah Dimas Amos (`Deborah-Dimas-Amos`):** Backend Developer (Recommendations, Approval Workflows, Document Processing)
- **Rick Afonso Gove (`rickafonsogove-cloud`):** Frontend Developer (Portals, Dashboards, UI/UX, CSS Design System)
- **Ian Edson Mwashanja (`Ian-Edson-Mwashanja`):** QA / Documentation / Deployment / Backend & Database Developer
