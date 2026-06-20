# Client Frontend

This folder contains the static browser UI for Manan.

See the root [README.md](../README.md) for full setup, API, and route documentation.

Frontend pages:

- `index.html` landing page
- `auth.html` sign in / register page
- `logs.html` mood logs dashboard
- `account.html` current account page

Frontend behavior:

- Uses `localStorage` for the access token.
- Redirects logged-in users to `/logs.html`.
- Calls `/api/auth/me` from `account.js`.
- Calls `/api/logs` from `logs.js`.
