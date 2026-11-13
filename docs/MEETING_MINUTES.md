# StudentSphere — Project Meeting Records & Minutes

**Coordinator / Secretary:** Tariro Nichole Tekwa (`Tariro22`)  
**Repository:** https://github.com/Tariro22/Group-project  
**Project:** Africa University Student Information & Recommendation System

---

## Meeting Record 1: Project Initiation & Scope Definition
- **Phase:** Sprint 1 — Planning & Concept Formulation
- **Meeting Type:** Project Kickoff & Requirements Alignment
- **Attendees:**
  - Tariro Nichole Tekwa (Project Manager / System Analyst)
  - Ashleigh Gopo (Backend Developer)
  - Deborah Dimas Amos (Backend Developer)
  - Rick Afonso Gove (Frontend Developer)
  - Ian Edson Mwashanja (QA / Deployment / Database Developer)
- **Agenda:**
  1. Review project prompt and Africa University portal objectives.
  2. Agree on team role assignments and technical areas of responsibility.
  3. Establish repository collaboration conventions, branching, and communication channels.
- **Key Decisions Taken:**
  - Adopted 3 core user personas: Student, Lecturer, Administrator.
  - Divided development work into frontend (Rick, Tariro), authentication & validation backend (Ashleigh), workflow & recommendation backend (Deborah), and database, academics & deployment (Ian).
  - Selected Vanilla ES Modules and clean CSS design system for high performance, zero build dependencies, and fast loading.
  - Tariro assigned to draft Project Proposal, System Requirements, and Stakeholder Analysis documents.
- **Action Items & Ownership:**
  - Tariro: Complete `docs/PROJECT_PROPOSAL.md`, `docs/REQUIREMENTS.md`, `docs/STAKEHOLDER_ANALYSIS.md`.
  - Ashleigh & Ian: Propose relational schema design and entity relationship model.
  - Rick: Develop Figma wireframes and foundational HTML/CSS layout.

---

## Meeting Record 2: Relational Schema & Prototype Review
- **Phase:** Sprint 2 — Initial Schema & Architecture Review
- **Attendees:** All group members.
- **Agenda:**
  1. Review proposed database schema and Entity Relationship Diagram.
  2. Determine database technology (SQLite for rapid prototype vs. cloud PostgreSQL).
  3. Validate student roster verification mechanism.
- **Key Decisions Taken:**
  - Ashleigh submitted initial schema design (`database/schema.sql`) and ERD diagram (`docs/images/ERD.png`).
  - Agreed that authentic student registration must validate against Africa University's official student roster (`student_roster`).
  - Decided to build the initial prototype using Node.js/Express and better-sqlite3 to validate the UI and workflow before cloud database migration.
  - Deborah tasked with mapping out recommendation lifecycle states (`pending`, `under_review`, `approved`, `declined`, `more_info_required`, `completed`).
- **Action Items & Ownership:**
  - Ashleigh: Implement user registration and authentication endpoints.
  - Deborah: Implement recommendation request creation and lecturer approval routing.
  - Rick: Implement Student and Lecturer dashboard layouts in `public/js/`.

---

## Meeting Record 3: Supabase PostgreSQL Migration & Academics Engine
- **Phase:** Sprint 3 — Cloud Database & Academics Integration
- **Attendees:** All group members.
- **Agenda:**
  1. Review migration from local SQLite prototype to production Supabase PostgreSQL.
  2. Implement course marks, grading scale, and semester GPA calculation logic.
  3. Review SSL encryption and database connection pooling.
- **Key Decisions Taken:**
  - Ian completed database migration to Supabase PostgreSQL, introducing `studentsphere/postgres.js` with SSL CA certificate (`prod-ca-2021.crt`) and transaction support.
  - Created 20 relational tables in the `studentsphere` schema.
  - Added academic hierarchy: faculties, departments, courses, course marks, and grading scales (`studentsphere/academics.postgres.js`).
  - Established two-step marks workflow: lecturer submits marks -> administrator reviews and approves batch -> student CGPA is automatically updated.
- **Action Items & Ownership:**
  - Ian: Complete `mountAcademics()` backend and verify GPA calculations.
  - Tariro: Develop student frontend views for academic results and notifications in `public/js/academics.js`.
  - Deborah: Integrate achievement verification backend with file upload handling.

---

## Meeting Record 4: Email System, Security Hardening & Render Deployment
- **Phase:** Sprint 4 — Infrastructure, Security & Deployment
- **Attendees:** All group members.
- **Agenda:**
  1. Implement automated email notifications and account recovery.
  2. Configure production deployment on Render.
  3. Address array safety in frontend profile views.
- **Key Decisions Taken:**
  - Ian implemented `studentsphere/mailer.js` featuring dual-mode delivery: `dev` mode logging to `email_log` table for testing, and `smtp` mode via Nodemailer for live email dispatch.
  - Ashleigh implemented password recovery endpoints (`/api/auth/forgot-password`, `/api/auth/reset-password`).
  - Deborah applied defensive array handling fixes to `public/js/student.js` (`asArray` utility) to eliminate undefined property errors.
  - Ian configured `studentsphere/render.yaml` for automated deployment on Render with persistent disk storage (`/var/data/uploads`) for uploaded certificates.
- **Action Items & Ownership:**
  - Ian: Finalize deployment configuration and health check endpoint (`/api/health`).
  - Rick: Polish responsive CSS breakpoints and modal dialog aesthetics.
  - Deborah: Audit recommendation release permissions.

---

## Meeting Record 5: Quality Assurance, Final Distribution & GitHub Submission
- **Phase:** Sprint 5 — Final Submission Preparation
- **Attendees:** All group members.
- **Agenda:**
  1. Review full test suite results across all three user roles.
  2. Verify GitHub commit history and individual member contributions.
  3. Prepare final documentation suite: `GROUP_CONTRIBUTIONS.md`, `README.md`, test plans, and user manuals.
- **Key Decisions Taken:**
  - Confirmed official group repository: `https://github.com/Tariro22/Group-project`.
  - Verified that all five members have identifiable technical deliverables documented in `GROUP_CONTRIBUTIONS.md`.
  - Validated that `README.md` is strictly under 260 words as required by university project guidelines.
  - Executed end-to-end smoke testing of authentication, database queries, recommendation requests, and achievement verification.
- **Action Items & Ownership:**
  - Tariro: Final review of project proposal, stakeholder analysis, and meeting records.
  - Ashleigh & Deborah: Confirm backend authentication and workflow tests.
  - Rick: Confirm frontend UI and responsiveness across devices.
  - Ian: Execute deployment verification, compile QA test cases, finalize documentation suite, and push to GitHub repository.

---

> *Note on Group Records: Specific physical meeting times and attendance timestamps reflect the sprint intervals verified in Git project commits. Any additional physical or online meeting notes taken outside these sprints may be appended by the Project Manager (`Tariro22`).*
