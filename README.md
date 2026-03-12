# Student Academic Tracker Web Application

A full-stack academic tracking application built with **Next.js App Router**, **TypeScript**, **Prisma ORM**, and **SQLite**.

## Features

- JWT/cookie-based authentication with secure password hashing (`bcryptjs`)
- Student-specific data isolation per user
- Dashboard with:
  - overall attendance percentage
  - weighted GPA (10-point system)
  - course-wise performance summary
- Course management (add, update, delete)
- Attendance tracker with 75% threshold support and missable-class calculation
- Margin calculator for target score planning
- Weighted GPA calculator with credits + grade entries

## Tech Stack

- Frontend: Next.js (App Router), React, Tailwind CSS
- Backend: Next.js API routes (Node.js runtime)
- Database: SQLite
- ORM: Prisma
- Language: TypeScript

## Project Structure

- `app/` – UI pages and API routes
- `components/` – reusable UI components
- `lib/` – Prisma client, auth helpers, calculation utilities
- `prisma/schema.prisma` – database models and relations
- `.env.example` – required environment variables

## Prisma Models

- `User`
- `Course`
- `Attendance`
- `Grade`
- `Margin`

All models are relationally mapped via Prisma (`User -> Course -> Attendance/Grade/Margin`).

## Local Setup

1. Install dependencies

```bash
npm install
```

2. Copy env file

```bash
cp .env.example .env
```

3. Update `.env` with your SQLite path and JWT secret

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secure_secret"
```

4. Generate Prisma client

```bash
npm run prisma:generate
```

5. Run migrations

```bash
npm run prisma:migrate -- --name init
```

6. Start development server

```bash
npm run dev
```

Open: `http://localhost:3000`

## API Endpoints

- `POST /api/auth/register` – Register
- `POST /api/auth/login` – Login
- `GET/POST/PUT/DELETE /api/courses` – Course CRUD
- `POST /api/attendance` – Attendance updates + computed stats
- `GET/POST /api/gpa` – GPA read/update
- `POST /api/margin` – Margin updates + computed stats
- `GET /api/dashboard` – Dashboard aggregated statistics

## Notes

- Authentication token is stored in an HTTP-only cookie named `token`.
- GPA formula:

```text
Weighted GPA = Σ(grade × credits) / Σ(credits)
```

- Attendance miss calculation uses a default threshold of 75%.
