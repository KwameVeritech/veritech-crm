# Veritech CRM

A modern, full-stack CRM built with **Next.js 14**, **Prisma**, and **PostgreSQL**. Designed for veritech.uk with a clean SaaS UI.

## Features

- **Contacts Management** — Create, edit, delete contacts with company linking and owner assignment
- **Companies** — Manage company profiles with industry, size, location, and revenue tracking
- **Deals** — Track sales opportunities through multiple stages (proposal, negotiation, won, lost)
- **Analytics** — Real-time dashboards with revenue charts, deal pipelines, and contact metrics
- **REST API** — Full CRUD endpoints for all resources

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **UI**: Custom CSS (no external UI library)
- **Charts**: Recharts for analytics visualizations

## Local Development

### Prerequisites

- Node.js 18+
- PostgreSQL 12+

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/KwameVeritech/veritech-crm.git
   cd veritech-crm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your PostgreSQL connection string
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Seed the database with mock data:
   ```bash
   npm run seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Railway

### 1. Create a Railway Project

- Go to [railway.app](https://railway.app)
- Click "New Project"
- Select "Deploy from GitHub repo"
- Connect your GitHub account and select this repository

### 2. Add PostgreSQL Database

- In your Railway project, click "Add Service"
- Select "PostgreSQL"
- Railway will automatically create a `DATABASE_URL` variable

### 3. Configure Environment Variables

- In the app service settings, go to "Variables"
- Add the reference variable:
  ```
  DATABASE_URL=${{ Postgres.DATABASE_URL }}
  ```

### 4. Deploy

- Railway will automatically build and deploy on every push to `main`
- The app will run migrations and seed the database on first boot
- Once deployed, click "Generate Domain" to get a public URL

### 5. Connect Custom Domain (Optional)

To point `crm.veritech.uk` to your Railway app:

1. In Railway, go to your app's "Networking" settings
2. Click "Add Custom Domain"
3. Enter `crm.veritech.uk`
4. Railway will provide a CNAME target
5. In your DNS provider (e.g., Namecheap, GoDaddy):
   - Create a CNAME record: `crm` → `[Railway CNAME target]`
   - Or if your DNS provider supports CNAME flattening (Cloudflare, DNSimple), create an ALIAS/ANAME at the root

## API Endpoints

### Contacts
- `GET /api/contacts` — List all contacts (supports `?status=active` filter)
- `POST /api/contacts` — Create a new contact
- `GET /api/contacts/[id]` — Get a specific contact
- `PUT /api/contacts/[id]` — Update a contact
- `DELETE /api/contacts/[id]` — Delete a contact

### Companies
- `GET /api/companies` — List all companies
- `POST /api/companies` — Create a new company
- `GET /api/companies/[id]` — Get a specific company
- `PUT /api/companies/[id]` — Update a company
- `DELETE /api/companies/[id]` — Delete a company

### Deals
- `GET /api/deals` — List all deals (supports `?stage=won` filter)
- `POST /api/deals` — Create a new deal

### Analytics
- `GET /api/analytics` — Get analytics data (monthly revenue, deals by stage, etc.)

## Database Schema

### Company
- `id` — Unique identifier
- `name` — Company name
- `industry` — Industry classification
- `size` — Employee count range
- `location` — City/region
- `revenue` — Annual revenue
- `createdAt`, `updatedAt` — Timestamps

### Contact
- `id` — Unique identifier
- `firstName`, `lastName` — Contact name
- `email` — Email address (unique)
- `phone` — Phone number
- `status` — "active" or "inactive"
- `owner` — Sales rep name
- `companyId` — Foreign key to Company
- `createdAt`, `updatedAt` — Timestamps

### Deal
- `id` — Unique identifier
- `title` — Deal name
- `value` — Deal amount (£)
- `stage` — "proposal", "negotiation", "won", "lost"
- `probability` — Win probability (0-100)
- `closeDate` — Expected close date
- `companyId` — Foreign key to Company
- `contactId` — Foreign key to Contact
- `createdAt`, `updatedAt` — Timestamps

### Activity
- `id` — Unique identifier
- `type` — "call", "email", "meeting"
- `description` — Activity details
- `companyId` — Foreign key to Company
- `contactId` — Foreign key to Contact (optional)
- `dealId` — Foreign key to Deal (optional)
- `createdAt` — Timestamp

## Mock Data

The seed script includes:
- 12 realistic UK companies across various industries
- 20 contacts with company associations
- 20 deals in various stages
- 20 activities (calls, emails, meetings)

Run `npm run seed` to load this data.

## Project Structure

```
veritech-crm/
├── app/
│   ├── api/              # API routes
│   ├── contacts/         # Contacts page
│   ├── companies/        # Companies page
│   ├── analytics/        # Analytics page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Overview/dashboard
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
├── lib/                  # Utilities (API client)
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.js           # Seed script
├── package.json
├── tsconfig.json
├── next.config.js
└── railway.json          # Railway deployment config
```

## Troubleshooting

### Database connection fails
- Ensure `DATABASE_URL` is set correctly in `.env.local`
- Check that PostgreSQL is running locally or accessible remotely

### Migrations fail
- Run `npx prisma migrate reset` to reset the database (⚠️ deletes all data)
- Then run `npm run seed` to reload mock data

### Port already in use
- Change the port: `npm run dev -- -p 3001`

## License

MIT

## Support

For issues or questions, contact the development team.

