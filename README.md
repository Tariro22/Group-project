# StudentSphere

**StudentSphere** is an academic portal built for Africa University. It centralizes student performance tracking, official recommendation letter generation, and verified achievement portfolios across dedicated portals for **Students**, **Lecturers**, and **Administrators**.

## Architecture & Technologies
- **Backend:** Node.js, Express REST API, Nodemailer
- **Database:** Supabase PostgreSQL (SSL CA-encrypted, 20 relational tables)
- **Frontend:** Vanilla JavaScript (SPA), HTML5, CSS3 design system
- **Hosting:** Render Web Service with persistent cloud disk storage

## Key Features
- **Student Portal:** Academic performance, semester GPA/CGPA transcripts, achievement evidence uploads, recommendation requests.
- **Lecturer Portal:** Assigned student reviews, course marks submission, recommendation drafting with release controls, achievement verification.
- **Admin Portal:** User approvals, lecturer assignments, academic faculties, batch marks approval, email audit logs.

## Quick Start
```bash
cd studentsphere
npm install
npm start
```
Configure `.env` with `DATABASE_URL` and `JWT_SECRET`. Open `http://localhost:3000`.

## Group Members & Roles
1. **Tariro Nichole Tekwa** (`Tariro22`): Project Manager / System Analyst / Frontend
2. **Ashleigh Gopo** (`ashblonde`): Backend (Auth, User Management, Validation)
3. **Deborah Dimas Amos** (`Deborah-Dimas-Amos`): Backend (Recommendations, Achievements, Files)
4. **Rick Afonso Gove** (`rickafonsogove-cloud`): Frontend (Dashboards, UI/UX, CSS)
5. **Ian Edson Mwashanja** (`Ian-Edson-Mwashanja`): QA, Documentation, Deployment, Database

## Documentation
- Detailed contributions: [`GROUP_CONTRIBUTIONS.md`](GROUP_CONTRIBUTIONS.md)
- Complete documentation suite: [`docs/`](docs/)
- Live deployment: [`docs/DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md)
