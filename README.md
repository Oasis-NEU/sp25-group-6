# Oasis SP25 — sp25-group-6

This repository contains the frontend and a small backend used by the Oasis SP25 group project.

**Short overview**: a Vite + React frontend (in `my-app-name/`) and a small Express server (in `my-app-name/server/`) that integrates with OpenAI.

**Repository**: `Oasis-NEU/sp25-group-6`

---

**Contents**
- `my-app-name/`: frontend app (Vite + React)
- `my-app-name/server/`: backend server (Express)
- `public/`, `src/`: static assets and React source

---

**Requirements**
- Node.js (v18+ recommended)
- npm (or yarn)
- An OpenAI API key if you use the server's OpenAI integration

---

**Quick start (Windows PowerShell)**

1. Install dependencies for the entire project (from repository root):

```powershell
cd my-app-name
npm install
cd server
npm install
```

2. Run the frontend (in one terminal):

```powershell
cd my-app-name
npm run dev
```

3. Run the backend (in another terminal). The server expects environment variables (see below):

```powershell
cd my-app-name\server
# ensure .env is present, then
npm run dev
# or
npm start
```

4. Open the frontend URL shown by Vite (usually `http://localhost:5173`).

---

**Environment variables**

Create a `.env` file in `my-app-name/server/` with the following (example):

```
OPENAI_API_KEY=sk-...
PORT=3001
```

The server uses `dotenv` to load environment variables and `openai` for API calls.

---

**Available scripts** (in `my-app-name/package.json`)
- `npm run dev`: start Vite dev server (frontend)
- `npm run build`: build production frontend
- `npm run preview`: preview built frontend
- `npm run lint`: run ESLint

**Server scripts** (in `my-app-name/server/package.json`)
- `npm start` / `npm run dev`: run `server.js` (Express server)

---

**Key files and purpose**
- `my-app-name/src/main.jsx`: app entry point
- `my-app-name/src/App.jsx`: top-level React app
- `my-app-name/src/Components/ClaimForm.jsx`: form UI used to submit claims
- `my-app-name/src/Components/FactChecker.jsx`: component that displays fact-check results
- `my-app-name/server/server.js`: Express server; routes and OpenAI integration live here
- `my-app-name/server/prompt.txt`: prompt text used by the server when calling OpenAI

---

**How the pieces fit**
- The frontend provides a UI for entering claims and displays results.
- The frontend makes HTTP requests to the Express server (check `server.js` for endpoints).
- The server formats prompts (from `prompt.txt`) and calls OpenAI to evaluate claims.

---

**Development notes & tips**
- Run frontend and server in separate terminals while developing.
- Use `npm run lint` in `my-app-name/` to check code style.
- If adding new environment values, add them to `.env` (server) and avoid committing secrets.

---

**Contributing**
- Open a branch, make changes, and create a pull request targeting `main`.
- Consider adding tests / CI for core functionality.

**License**
- No license specified. Add a `LICENSE` file if you want to open-source this repo.

---

If you'd like, I can:
- commit this `README.md` to a branch and open a pull request, or
- expand the README with API endpoint examples and a sample `.env` that omits secrets.
