# StudentSphere — Software Defect & Bug Tracking Report

**QA Lead:** Ian Edson Mwashanja (`Ian-Edson-Mwashanja`)  
**Project:** Africa University Student Information, Portfolio & Recommendation System

---

## 1. Defect Classification Summary

| Severity Level | Definition | Total Encountered | Total Resolved | Open / Mitigated |
|---|---|---|---|---|
| **Critical (P1)** | System crash, authentication failure, or data loss | 2 | 2 | 0 |
| **High (P2)** | Feature inoperable or incorrect calculation logic | 3 | 3 | 0 |
| **Medium (P3)** | UI rendering defect or unexpected error message | 3 | 3 | 0 |
| **Low (P4)** | Cosmetic imperfection or minor text formatting | 2 | 2 | 0 |

---

## 2. Resolved Defects

### BUG-001: Student Dashboard Runtime Error on Empty Entity Arrays
- **Defect ID:** `BUG-001`
- **Severity:** High (P2)
- **Module:** Frontend Student Portal (`studentsphere/public/js/student.js`)
- **Reported By:** Deborah Dimas Amos / Ian Edson Mwashanja
- **Commits:** `5928a1e`, `d7a44af`
- **Description:** When a newly registered student accessed the dashboard, the backend returned null or undefined for sub-collections (`achievements`, `projects`, `skills`). The frontend attempted to execute `.length` and `.map()` directly on undefined properties, throwing an unhandled `TypeError` that prevented the dashboard from rendering.
- **Root Cause:** Profile endpoint omitted default empty arrays when the related relational tables contained no records for that user.
- **Resolution:** Implemented defensive array wrapping utility `asArray(val)` in `public/js/student.js`. Ensured `achievements`, `projects`, and `skills` safely default to empty arrays `[]` before iteration.
- **Verification:** Verified with new student account; empty state placeholder (`emptyBox`) now renders cleanly without exceptions.

---

### BUG-002: Student Profile API Response Field Mapping
- **Defect ID:** `BUG-002`
- **Severity:** High (P2)
- **Module:** Backend API (`studentsphere/server.pg.js`)
- **Reported By:** Deborah Dimas Amos
- **Commits:** `d7a44af`, `63e8988`
- **Description:** The `/api/me/profile` and `/api/students/:id/profile` endpoints returned inconsistent object formats between SQLite and Supabase PostgreSQL. Frontend expected `{ user, profile, achievements, projects, results }`, but nested objects were flattened or missing.
- **Root Cause:** PostgreSQL migration query did not alias fields correctly when combining `users` and `profiles` records.
- **Resolution:** Restructured SQL join and JSON serialization to guarantee a consistent response structure with all nested arrays initialized.
- **Verification:** Tested endpoint with both student self-lookup and lecturer inspection; all profile attributes bind properly.

---

### BUG-003: PostgreSQL SSL Certificate Validation Failure on Render
- **Defect ID:** `BUG-003`
- **Severity:** Critical (P1)
- **Module:** Database Connection (`studentsphere/postgres.js`)
- **Reported By:** Ian Edson Mwashanja
- **Commits:** `813e303`, `4d2a1d7`
- **Description:** Supabase PostgreSQL pooler rejected SSL connections on Render when using default Node.js TLS settings, throwing `SELF_SIGNED_CERT_IN_CHAIN`.
- **Root Cause:** Node's internal trust store lacked Africa University's intermediate certificate for AWS EU-West-1 poolers.
- **Resolution:** Integrated official root CA certificate `prod-ca-2021.crt` into the PostgreSQL pool configuration (`ssl: { ca: fs.readFileSync(...) }`), enforcing strict `rejectUnauthorized: true`.
- **Verification:** Connection test succeeded via `verify-db.js`; production Render blueprint confirmed encrypted SSL connectivity.

---

### BUG-004: Inconsistent Grading Scale Points during Batch Approval
- **Defect ID:** `BUG-004`
- **Severity:** High (P2)
- **Module:** Academics Engine (`studentsphere/academics.postgres.js`)
- **Reported By:** Tariro Nichole Tekwa / Ian Edson Mwashanja
- **Commits:** `0bdd454`, `bc5499f`
- **Description:** When an administrator approved marks for a course, the GPA calculation occasionally evaluated grade points as string values (`"4"` instead of `4`), causing string concatenation in cumulative credit arithmetic.
- **Root Cause:** PostgreSQL `NUMERIC` columns were cast as strings by the `pg` driver unless explicitly mapped via `Number()`.
- **Resolution:** Added explicit `Number()` type casting on all `points`, `min_mark`, and `credits` attributes in `getScale()` and `weighted()`.
- **Verification:** Tested weighted GPA calculation across courses with varied credits (3, 4 credits); arithmetic verified accurate to 2 decimal places.

---

### BUG-005: Mobile Drawer Menu Not Closing on Link Click
- **Defect ID:** `BUG-005`
- **Severity:** Medium (P3)
- **Module:** UI / Responsive Shell (`studentsphere/public/js/app.js`)
- **Reported By:** Rick Afonso Gove
- **Commits:** `5740f76`
- **Description:** On mobile viewports, selecting a navigation link in the off-canvas drawer navigated to the route but left the drawer overlay open, obstructing the page content.
- **Root Cause:** Missing event listener on drawer link elements to toggle the `.open` CSS class.
- **Resolution:** Bound click event listener on all `#drawer a.item` elements to automatically dismiss the drawer and background overlay upon selection.
- **Verification:** Tested on simulated mobile device; drawer closes smoothly upon route transition.

---

## 3. Known Limitations & Operating Notes

1. **Email Delivery Configuration:**
   - *Status:* Working as designed.
   - *Note:* In default development mode (`MAIL_MODE=dev`), real emails are not sent over the internet; instead, every generated email is saved with complete HTML into the PostgreSQL `email_log` table for administrative review in **Admin -> Email Log**. To enable live internet delivery, valid SMTP credentials must be provided in the server environment variables (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`).
2. **File Upload Persistent Disk on Render:**
   - *Status:* Configured in `render.yaml`.
   - *Note:* On free-tier cloud containers that restart without persistent disks, local disk writes are ephemeral. For production permanence, the Render Persistent Disk mount (`/var/data/uploads`) configured in `render.yaml` must be utilized.
