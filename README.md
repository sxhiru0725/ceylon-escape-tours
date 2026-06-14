# Ceylon Escape Tours

The project is split into two independently runnable applications:

- `frontend/` - React and Vite website
- `backend/` - Node HTTP API for travel enquiries

## Setup

```bash
npm install
npm --prefix frontend install
npm --prefix backend install
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies `/api` requests to the
backend at `http://localhost:3001`.

## Commands

```bash
npm run dev
npm run lint
npm run test
npm run build
```

Copy `backend/.env.example` to `backend/.env`, then replace every placeholder:

```env
PORT=3001
FRONTEND_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<db>
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-business-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=your-business-email@gmail.com
```

If you use Gmail, generate an app password in your Google account and use that
instead of your normal password. Never commit `backend/.env`.

## Run Separately

```bash
npm --prefix backend run dev
npm --prefix frontend run dev
```

## Test An Enquiry

1. Open `http://localhost:5173`.
2. Complete the enquiry form and submit it.
3. Confirm the success message appears.
4. In MongoDB Atlas, open Browse Collections and check the `enquiries`
   collection in the database named by `MONGODB_URI`.
5. Check the inbox and spam folder for `EMAIL_TO`.

The backend returns clear errors for invalid form data, unavailable MongoDB,
failed saves, failed email delivery, malformed JSON, and unknown API routes.

Check backend readiness at `http://localhost:3001/api/health`. The API starts
even when MongoDB or email is not configured, and the health response reports
each service as connected/configured or unavailable.

If email reports `not configured`, replace every placeholder in
`backend/.env`, especially `EMAIL_PASS`, with a real Gmail app password and
restart the backend.
