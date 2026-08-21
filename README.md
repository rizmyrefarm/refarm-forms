# ReFarm Forms Platform

Internal digital-forms and trial lifecycle platform for **ReFarm Global**. It provides 10 standardized digital forms, saves every submission to a MySQL database with JSON payload storage and denormalized metadata indexing, allows review/filtering/editing via an Admin Dashboard, supports file attachments and client-side PDF export, and is ready for automated deployment via **Dokploy**.

---

## 1. Supported Lifecycle Forms & Slugs

| # | Slug | Form Title | Category | Description |
|---|------|------------|----------|-------------|
| 1 | `sow` | Statement of Work & Trial Protocol | Delivery | Comprehensive trial protocol, baseline assessments, application logs, sampling, and dual sign-off. |
| 2 | `sales-activity-card` | Sales Activity Card | Delivery | Commercial intake, products, fulfilment, client engagement, quote files, payments, and transport logistics. |
| 3 | `ipic` | Initial Project Information Card | Assessment | External client project intake, problem statement, strategic alignment, and expected value. |
| 4 | `ipic-internal` | IPIC Internal | Assessment | Multi-department review (Agronomy, R&D, Engineers), SOW tasks, budget, risk avoidance, and 4-party sign-off. |
| 5 | `pemc` | Project Evaluation Monitoring Card | Monitoring | Progress monitoring, 5-point evaluation rating matrix, risk resolution, and recommendations. |
| 6 | `challenge-card` | Project Challenge Card | Monitoring | On-site problem diagnosis, impact areas, evidence uploads, options A/B/C, action plan, and KPI forecast. |
| 7 | `sow-internal` | Scope of Work & Responsibility Matrix | Delivery | Task assignment, responsible parties, expected deliverables, and deadline tracking. |
| 8 | `ecofarm-phase-0-1` | EcoFarm Phase 0.1: Initial Assessment | Assessment | 7-day qualification, land/site evaluation, photo register uploads, and ReFarm technology matrix. |
| 9 | `ecofarm-phase-0-2` | EcoFarm Phase 0.2: Detailed Site Assessment | Assessment | Detailed water/infrastructure/soil review, infrastructure gap analysis, 7-domain risk matrix, 1–10 scoring. |
| 10 | `ecofarm-phase-0-3` | EcoFarm Phase 0.3: Feasibility Review | Assessment | High management investment assessment, CAPEX breakdown (AED), feasibility summary, and C-Level sign-offs. |

---

## 2. Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript (`output: "standalone"`)
- **Styling**: Tailwind CSS + custom ReFarm green design tokens (`#0f3d21`, `#14532d`, `#1b6b3a`, `#2f9e44`, `#e6f4ea`)
- **Database & ORM**: MySQL 8.0 + Prisma ORM (single flexible `Submission` table with `data` JSON column and denormalized indexes)
- **State & Drafts**: Real-time `localStorage` autosave per form slug with visible "Saved ✓" indicator
- **Print & PDF**: Native browser print CSS (`window.print()`) optimized for portrait A4 reporting with toolbars and buttons hidden
- **Containerization**: Multi-stage Dockerfile, Docker Compose for local full-stack development, Dokploy-ready

---

## 3. Local Development

### Prerequisites
- Node.js 20+
- pnpm (`npm install -g pnpm`)
- MySQL 8.0 (or Docker)

### Setup Instructions

1. **Clone and install dependencies**:
   ```bash
   git clone <repo-url>
   cd refarm-forms
   pnpm install
   ```

2. **Environment configuration**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Update `DATABASE_URL` with your MySQL connection string.

3. **Generate Prisma Client & Run Migrations**:
   ```bash
   pnpm prisma generate
   # If running against local MySQL:
   npx prisma migrate dev --name init
   ```

4. **Start Development Server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

### Running with Docker Compose (App + MySQL 8)

To start the full stack (Next.js app + MySQL database) with one command:
```bash
docker compose up --build
```
- Web Application: [http://localhost:3000](http://localhost:3000)
- Admin Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)
- MySQL: `localhost:3306` (user: `refarm_user`, password: `refarm_pass`, db: `refarm_forms`)

---

## 4. Deploy on Dokploy (Step-by-Step Guide)

Follow these steps to deploy ReFarm Forms in your Dokploy instance:

### Step 1: Push Code to Repository
Push this repository to GitHub, GitLab, or your Git provider accessible by Dokploy.

### Step 2: Create Project in Dokploy
1. Log in to your Dokploy Dashboard.
2. Click **Create Project** and name it `refarm-forms`.

### Step 3: Add MySQL Database Service
1. Inside the `refarm-forms` project, click **Create Service** → **Database** → **MySQL**.
2. Set the database name to `refarm_forms`.
3. Dokploy automatically connects the database to the internal Docker network `dokploy-network`.
4. Copy the **Internal Connection URL** (e.g., `mysql://mysql_user:password@mysql-container-name:3306/refarm_forms`).

### Step 4: Create Application Service
1. In the same project, click **Create Service** → **Application**.
2. Select your **Git Repository** (or Dockerfile).
3. Set **Build Type** to `Dockerfile`.
4. In the **Network** section, ensure the Application is attached to **`dokploy-network`** so it can communicate with the MySQL database service.

### Step 5: Configure Environment Variables
In the Application's **Environment** tab, add:
```env
DATABASE_URL="mysql://<user>:<password>@<mysql-service-internal-host>:3306/refarm_forms"
UPLOAD_DIR="/app/uploads"
NODE_ENV="production"
PORT=3000
```

### Step 6: Configure Persistent Volumes
In the Application's **Volumes** (or Mounts) tab:
- **Host Path / Volume Name**: `refarm_uploads_data`
- **Mount Path**: `/app/uploads`
*(This ensures uploaded file attachments like quotations, soil reports, and photos persist across deployments).*

### Step 7: Deploy
1. Click **Deploy**.
2. Dokploy builds the standalone container image.
3. On startup, the container entrypoint (`/app/start.sh`) automatically runs `npx prisma migrate deploy` to create or update database tables before starting `node server.js` on port 3000.

---

## 5. Security & Internal Network Access

> [!IMPORTANT]
> **Internal-Only Platform**: This app has **no user authentication** by design. Do NOT expose it unprotected to the public internet.

Recommended deployment protections:
1. **Private Network / VPN (Recommended)**:
   - Run the service strictly on a private network or overlay mesh (e.g. **Tailscale**, WireGuard, or corporate VPC).
   - Bind Dokploy only to private network interfaces.
2. **Dokploy / Traefik IP Whitelist Middleware**:
   - In Dokploy's Traefik / Routing settings, add an **IP AllowList** middleware restricting access to office static IPs.
3. **Basic Auth Middleware**:
   - In Dokploy's Traefik middleware settings, attach a **BasicAuth** middleware in front of the domain for simple team credential verification.
4. **SSL / HTTPS**:
   - SSL certificates are automatically provisioned via Dokploy's Traefik Let's Encrypt integration when configuring your internal sub-domain (e.g., `forms.internal.refarm.com`).

---

## 6. Project Architecture

```
/app
  /(forms)/[slug]/page.tsx       # Renders any of the 10 forms by slug
  /admin/page.tsx                # Submissions list, search, filter, CSV export
  /admin/[id]/page.tsx           # View saved submission (read-only + print)
  /admin/[id]/edit/page.tsx      # Edit saved submission and update
  /api/submissions/route.ts      # POST create submission, GET list with filters
  /api/submissions/[id]/route.ts # GET one, PUT update, DELETE submission
  /api/upload/route.ts           # POST file upload to UPLOAD_DIR
  /api/files/[filename]/route.ts # GET securely serve uploaded files
  page.tsx                       # Hub landing linking to all 10 forms
  globals.css                    # ReFarm color palette & print styles
/components
  form/
    FieldRenderer.tsx            # Renders individual fields, chips, notes, signs
    FileUploadField.tsx          # Async file upload & preview component
    FormHeader.tsx               # ReFarm green header & metadata inputs
    FormToolbar.tsx              # Sticky toolbar (Brand, Save status, Print, Submit)
    TableField.tsx               # Matrix & dynamic add/remove table component
  FormRenderer.tsx               # Interactive state engine, conditionals, autosave
  SubmissionView.tsx             # Generic read-only submission renderer
  Navbar.tsx                     # Top navigation for Hub and Admin
/lib
  forms/                         # 10 data-driven form definitions
    sow.ts, sales-activity-card.ts, ipic.ts, ipic-internal.ts,
    pemc.ts, challenge-card.ts, sow-internal.ts,
    ecofarm-phase-0-1.ts, ecofarm-phase-0-2.ts, ecofarm-phase-0-3.ts,
    index.ts
  db.ts                          # Prisma singleton client
  types.ts                       # TypeScript interfaces
  utils.ts                       # Helper methods, CSV generator, condition logic
/prisma
  schema.prisma                  # Submission schema definition
Dockerfile                       # Multi-stage standalone production build
docker-compose.yml               # Local development stack (App + MySQL 8)
```
