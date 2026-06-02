# Client (frontend)

This is a minimal static frontend for the Manan project. It is served from the project's `client/` folder.

Quick start:

1. Install server deps (if you haven't):

```bash
npm install
```

2. Start the server:

```bash
npm run start
```

3. Open http://localhost:3000/ in your browser.

Notes:
- The frontend calls `/api/auth/login` and `/api/auth/register` and expects the backend to be running from the same origin.
- The login request stores the returned `accessToken` in localStorage and the server sets a refresh cookie.
