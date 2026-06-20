# Manan

Manan is a reflective mood-tracking app with a Node/Express backend, PostgreSQL persistence, and a static frontend served from the `client/` folder.

## What It Does

- User authentication with login, registration, token-based session checks, refresh-token cookie support, and logout.
- Protected user profile lookup through `/api/auth/me`.
- Mood log CRUD through `/api/logs`.
- Static frontend pages for the landing page, auth flow, logs dashboard, and account page.

## Project Structure

- `src/server.js` boots the Express app and mounts API routes.
- `src/modules/auth_module/` contains login, register, refresh, logout, and `/me`.
- `src/modules/logs_module/` contains logs CRUD routes and services.
- `client/` contains the static frontend pages and browser scripts.

## Prerequisites

- Node.js 18+ recommended.
- PostgreSQL database.
- Environment variables for database and JWT secrets.

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root with the values your app expects:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/manan
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
PORT=3000
```

Start the server:

```bash
npm start
```

Then open:

```text
http://localhost:3000/
```

## Frontend Pages

- `/` landing page
- `/auth.html` login/register page
- `/logs.html` logs dashboard
- `/account.html` signed-in account page

If a user is already logged in, the frontend redirects them to `/logs.html`.

## API Routes

### Auth

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/refresh-token`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Logs

- `GET /api/logs`
- `GET /api/logs/:id`
- `POST /api/logs`
- `PUT /api/logs/:id`
- `DELETE /api/logs/:id`

## Frontend Behavior

- Login stores the returned access token in `localStorage`.
- Authenticated users are redirected to `/logs.html`.
- The account page fetches the current user from `/api/auth/me` with the access token in the `Authorization` header.
- Logs actions also use the access token in the `Authorization` header.

## Scripts

- `npm start` starts the server.
- `npm test` is currently a placeholder.

## Notes

- The frontend is served from the same Express app, so API and UI run on the same origin.
- Refresh tokens are stored in an HTTP-only cookie.
- The app expects the database schema for users, logs, emotions, and thoughts to already exist.
