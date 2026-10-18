# Recipe Book Web

React (Vite) + Tailwind CSS frontend for the Full-Stack Recipe Book assignment.

## Stack

- **React 19** with TypeScript, routed by **React Router 8**
- **Vite 8** dev server and production build
- **Tailwind CSS 4** with design tokens defined in `src/styles/global.css`
- **Axios** client with automatic CSRF handling and silent token refresh

## Architecture

```text
Page -> Feature component -> Service function -> Shared Axios client -> API
```

| Folder | Responsibility |
| --- | --- |
| `src/pages` | One folder per route; composes the screen |
| `src/components/features` | Owns request state for a task (login, collection, admin table…) |
| `src/components/common` | Application UI shared across features (Navbar, RecipeMeta) |
| `src/components/ui` | Reusable primitives: Button, Input, Modal, Table… |
| `src/components/context` | AuthContext / AuthProvider / useAuth + route guards |
| `src/services` | Endpoint paths and envelope unwrapping (`*Service` functions) |
| `src/lib` | Axios client (cookies, CSRF, refresh) and `cn` helper |

## Design system

Tokens live in `src/styles/global.css` (`@theme`):

- **Parchment** backgrounds (`#faf6f0`), **espresso** ink text
- **Terracotta flame** accent (`#c2410c`) with saffron highlights
- Serif display headings (`font-display`) for a cookbook character

## Local development

```bash
npm install
cp .env.example .env    # set VITE_API_BASE_URL to your API
npm run dev             # http://localhost:5173
```

The API must be running (default `http://localhost:7000/api`) and its
`FRONTEND_URL` must match `http://localhost:5173` exactly.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Vercel → New Project → import the repository (Vite preset is auto-detected).
3. Environment variable:
   - `VITE_API_BASE_URL` = your Render API URL + `/api`
     (e.g. `https://recipe-book-api-xxxx.onrender.com/api`)
4. Deploy. The API's `FRONTEND_URL` must be set to the Vercel URL
   (e.g. `https://recipe-book-web-xxxx.vercel.app`) for credentialed requests.
