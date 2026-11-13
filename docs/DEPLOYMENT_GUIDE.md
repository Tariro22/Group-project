# StudentSphere — Production Deployment & Configuration Guide

**Deployment Lead:** Ian Edson Mwashanja (`Ian-Edson-Mwashanja`)  
**Project:** Africa University Student Information, Portfolio & Recommendation System  
**Application Entry Point:** `studentsphere/server.pg.js`  
**Hosting Target:** Render Web Service + Render Persistent Disk + Supabase PostgreSQL

---

## 1. Cloud Architecture Overview

StudentSphere is deployed using a decoupled, high-resilience cloud infrastructure:
1. **Application Web Service (Render):** Hosts the Express Node.js application server, serves the frontend static Single Page Application (HTML/CSS/JS), and provides RESTful endpoints.
2. **Database Engine (Supabase PostgreSQL):** Managed PostgreSQL database cluster (AWS EU-West-1 pooler) with 20 relational tables residing under the `studentsphere` schema.
3. **Cloud Storage (Render Persistent Disk):** Mounts a dedicated 1GB+ persistent volume at `/var/data/uploads` to store uploaded student evidence documents safely across container redeployments.
4. **Email Notification Service:** Connects via Nodemailer to an institutional or authenticated SMTP relay (e.g., Africa University SMTP / Gmail / Brevo).

```
  ┌────────────────────────────────────────────────────────┐
  │                 Client Web Browsers                    │
  │     (Students, Academic Lecturers, Administrators)     │
  └───────────────────────────┬────────────────────────────┘
                              │ HTTPS (Port 443)
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │              Render Web Service (Node.js)              │
  │          Application Entry: server.pg.js               │
  ├───────────────────────────┬────────────────────────────┤
  │ Health Check: /api/health │ Static SPA: /public        │
  └─────────────┬─────────────┴───────────────┬────────────┘
                │                             │
    TLS/SSL with Root CA                      │ Local Disk Mount
    (prod-ca-2021.crt)                        │ (/var/data/uploads)
                │                             │
                ▼                             ▼
  ┌───────────────────────────┐ ┌──────────────────────────┐
  │    Supabase PostgreSQL   │ │  Render Persistent Disk  │
  │  Schema: "studentsphere"  │ │  (Certificates, Evidence │
  │    (20 Relational Tables) │ │   PDF/PNG/JPEG Files)    │
  └───────────────────────────┘ └──────────────────────────┘
```

---

## 2. Prerequisites
- **GitHub Repository Access:** Official group repository at `https://github.com/Tariro22/Group-project`.
- **Node.js Environment:** v20.x or later installed on the hosting server.
- **Render Account:** Standard or Starter tier account with Blueprint and Persistent Disk capabilities.
- **Supabase PostgreSQL Account:** Active database project with SSL enabled.
- **Root CA Certificate:** Africa University / Supabase intermediate CA certificate (`prod-ca-2021.crt`) placed in the application root directory.

---

## 3. Render Deployment Setup (Blueprint Automation)

The repository provides a pre-configured `studentsphere/render.yaml` specification that provisions the web service and attaches the required persistent disk volume automatically.

### 3.1 Blueprint Specification (`render.yaml`)
```yaml
services:
  - type: web
    name: studentsphere-au
    env: node
    plan: starter
    rootDir: studentsphere
    buildCommand: npm install
    startCommand: npm start
    healthCheckPath: /api/health
    disk:
      name: uploads-data
      mountPath: /var/data/uploads
      sizeGB: 1
    envVars:
      - key: NODE_ENV
        value: production
      - key: NODE_VERSION
        value: 20
      - key: UPLOAD_DIR
        value: /var/data/uploads
```

### 3.2 Step-by-Step Render Deployment
1. Log in to the [Render Dashboard](https://dashboard.render.com).
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub account and select repository `Tariro22/Group-project`.
4. Point the Blueprint path to `studentsphere/render.yaml`.
5. Render will automatically detect the build settings, root directory, and disk configuration.
6. Configure the secret environment variables detailed in Section 4.
7. Click **Apply Blueprint** to trigger the initial automated build and deployment.

---

## 4. Environment Variables Reference

Configure these environment variables securely within the Render service settings (or in `studentsphere/.env` for local development). **Never commit production passwords or secrets to Git.**

| Variable Name | Required | Example / Recommended Value | Description |
|---|---|---|---|
| `NODE_ENV` | Yes | `production` | Sets Node runtime to production mode (enables caching and error shielding). |
| `PORT` | Yes | `3000` (Render defaults to 10000) | Port on which the Express web server listens. |
| `DATABASE_URL` | Yes | `postgres://postgres.[ref]:[pass]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres` | Supabase PostgreSQL connection URI. |
| `DB_SCHEMA` | Yes | `studentsphere` | Default database schema containing the 20 application tables. |
| `JWT_SECRET` | Yes | `e.g. 64-character-cryptographically-random-string` | Secret key used to sign and verify user session tokens. |
| `APP_URL` | Yes | `https://studentsphere-au.onrender.com` | Base public URL of the application (used in password reset links). |
| `UPLOAD_DIR` | Yes | `/var/data/uploads` (Render) / `uploads` (Local) | Directory path where achievement evidence files are stored. |
| `MAIL_MODE` | No | `smtp` (Production) / `dev` (Local Default) | When set to `dev`, emails are logged in PostgreSQL instead of sending. |
| `SMTP_HOST` | If SMTP | `smtp.gmail.com` / `smtp.africau.edu` | Outbound mail server hostname. |
| `SMTP_PORT` | If SMTP | `587` | Outbound mail server port (587 for STARTTLS, 465 for SSL). |
| `SMTP_SECURE` | If SMTP | `false` | Set `true` if connecting on port 465; `false` for port 587. |
| `SMTP_USER` | If SMTP | `notifications@studentsphere.africau.edu` | Username or email address for SMTP authentication. |
| `SMTP_PASS` | If SMTP | `your-secure-app-password` | App password or authentication token for SMTP. |
| `MAIL_FROM` | If SMTP | `StudentSphere <no-reply@studentsphere.africau.edu>` | Display name and verified sender address. |

---

## 5. Supabase PostgreSQL Configuration

1. In Supabase, open **Project Settings -> Database**.
2. Copy the **Connection String (Transaction Pooler - IPv4)**.
3. Ensure SSL connection is required.
4. Verify that `prod-ca-2021.crt` is located in `studentsphere/prod-ca-2021.crt`.
5. Run the verification script to confirm connectivity:
   ```bash
   cd studentsphere
   node verify-db.js
   ```
6. The database pool automatically manages connections with a pool limit of 5, idle timeout of 30,000ms, and connection timeout of 10,000ms.

---

## 6. Verifying Production Deployment

Once the Render service reports **Deploy Live**, verify the following health checks:

### 6.1 Automated Health Check Endpoint
Send an HTTP GET request to `/api/health`:
```bash
curl -i https://studentsphere-au.onrender.com/api/health
```
**Expected Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "ok": true,
  "database": "connected"
}
```

### 6.2 Operational Smoke Test Checklist
- [x] Access root URL `https://studentsphere-au.onrender.com/#/` and confirm AU branded logo and styles render properly.
- [x] Test student registration with roster ID `220145` (auto-population verified).
- [x] Test administrator login using seeded credentials.
- [x] Test password reset link generation.
- [x] Verify evidence upload and download functionality against `/var/data/uploads`.
- [x] Check Admin Email Log to verify transactional email generation.

---

## 7. Local Development Guide

To run the application locally for feature testing:

```bash
# 1. Clone repository
git clone https://github.com/Tariro22/Group-project.git
cd Group-project/studentsphere

# 2. Install dependencies
npm install

# 3. Create local configuration file (.env)
# Copy example configuration:
cp .env.example .env

# 4. Fill in your DATABASE_URL and JWT_SECRET in .env
# Example:
# DATABASE_URL=postgres://...
# JWT_SECRET=super-secret-development-key-12345
# MAIL_MODE=dev

# 5. Start development server
npm start
```
Open `http://localhost:3000` in your web browser.
