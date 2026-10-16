# Online Digital Product E‑Commerce System

Full‑stack e‑commerce platform with a Daraz/Amazon‑inspired storefront, admin dashboard, and MongoDB backend.

| Layer | Stack |
|--------|--------|
| **Frontend** | React 18, Vite, React Router, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express, Mongoose |
| **Database** | MongoDB |
| **Auth** | JWT |

## Features

- Responsive homepage: navbar, category sidebar with mega menu, hero slider, flash sale, category grid, featured products
- **Admin-managed navigation categories** (sidebar + homepage grid) under **Admin → Settings**
- **Configurable storefront button labels** (physical vs digital products)
- Product catalog from API with search (`?q=`) filtering
- Cart (guest `localStorage` + authenticated API)
- Checkout and orders (MongoDB routes)
- Admin dashboard: users, products, orders, transactions, settings

## Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** 6+ running locally (`mongodb://localhost:27017`) **or** Docker

## Quick start (local)

### 1. Clone and install

```bash
cd "Online Digital Product E-Commerce System"
npm run install:all
```

Or install each app separately:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Environment files

**Backend** — copy and edit `backend/.env`:

```bash
cd backend
cp .env.example .env
```

Required variables:

| Variable | Example | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb://localhost:27017/digital_ecommerce` | MongoDB connection string |
| `JWT_SECRET` | `your_secret_key` | Secret for signing JWTs |
| `PORT` | `5000` | API port |
| `FRONTEND_URL` | `http://localhost:5173` | CORS allowed origin |
| `EMAIL_USER` | `you@gmail.com` | Gmail address for sending user OTP / verification emails |
| `EMAIL_PASS` | `xxxx xxxx xxxx xxxx` | Gmail [App Password](https://myaccount.google.com/apppasswords) (not your normal password) |

**User vs admin auth:** Registration and user login require email verification via a **6-digit OTP sent to Gmail**. Admin login (`/admin/login`) uses password only — no OTP or verification step.

**Frontend** — copy and edit `frontend/.env`:

```bash
cd frontend
cp .env.example .env
```

| Variable | Example |
|----------|---------|
| `VITE_API_URL` | `http://localhost:5000` |

### 3. Start MongoDB

**Option A — local install:** ensure MongoDB is running on port `27017`.

**Option B — Docker only for DB:**

```bash
docker compose up -d mongodbN
```

### 4. Seed database (admin + sample products)

With MongoDB running:

```bash
cd backend
npm run db:seed
```

Default admin account:

- **Email:** `admin@example.com`
- **Password:** `Admin@1234`

Override with `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_USERNAME` in `backend/.env`.

### 5. Run the apps

Use **two terminals**:

**Terminal 1 — API:**

```bash
cd backend
npm run dev
```

API: [http://localhost:5000](http://localhost:5000)  
Health check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

**Terminal 2 — storefront:**

```bash
cd frontend
npm run dev
```

App: [http://localhost:5173](http://localhost:5173)

### Root shortcuts

From the project root (after `npm run install:all`):

```bash
npm run dev:backend    # nodemon API
npm run dev:frontend   # Vite dev server
npm run db:seed        # admin + products
npm run build:frontend # production build → frontend/dist
```

## Docker (full stack)

Starts MongoDB, backend, and production-built frontend:

```bash
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| MongoDB | localhost:27017 |

After containers are up, seed data (from your host, with MongoDB exposed on 27017):

```bash
cd backend
npm run db:seed
```

## URLs

| Page | URL |
|------|-----|
| Storefront | http://localhost:5173 |
| Login | http://localhost:5173/login |
| Admin login | http://localhost:5173/admin/login |
| Admin dashboard | http://localhost:5173/admin |
| API health | http://localhost:5000/api/health |

## Project structure

```
frontend/                 React + Vite app
  src/components/         Navbar, Sidebar, ProductCard, …
  src/context/            Auth, Cart, SystemConfig, Theme
  src/pages/              Home, Cart, Checkout, Admin, …

backend/                  Express API
  server.js               Entry point
  src/config/mongoose.js  MongoDB connection
  src/models/             User, Product, Order, SystemConfig, …
  src/routes/             auth, products, cart, orders, admin, config
  src/database/           seedAdmin.js, seedProducts_new.js

docker-compose.yml        MongoDB + backend + frontend
MONGODB_MIGRATION.md      MySQL → MongoDB migration notes
```

## API overview

| Prefix | Purpose |
|--------|---------|
| `/api/auth` | Register, login, verify |
| `/api/products` | Product CRUD & listing |
| `/api/cart` | Cart operations |
| `/api/orders` | Checkout & orders |
| `/api/config` | Public UI labels & categories |
| `/api/admin` | Admin users, orders, config |

## Admin settings

1. Log in at `/admin/login` with the seeded admin account.
2. Open **Settings**:
   - **Navigation categories** — edit sidebar and homepage categories.
   - **Storefront button labels** — customize Add to Cart / Buy Now text.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `MongoDB connection failed` | Start MongoDB or run `docker compose up -d mongodb`. Check `MONGODB_URI` in `backend/.env`. |
| Frontend cannot reach API | Set `VITE_API_URL=http://localhost:5000` in `frontend/.env` and restart Vite. |
| CORS errors | Set `FRONTEND_URL` in `backend/.env` to match your Vite URL (default `http://localhost:5173`). |
| Port 5000 in use | Change `PORT` in `backend/.env`. |
| Empty product list | Run `npm run db:seed` in `backend` with MongoDB running. |
| OTP / verification email not received | Set `EMAIL_USER` and `EMAIL_PASS` (Gmail App Password) in `backend/.env`. Restart the API. In dev without Gmail, OTP is printed in the backend console. |
| PowerShell `&&` error | Run commands separately or use `;` instead of `&&`. |

## Production build

```bash
cd frontend
npm run build
# static files in frontend/dist — serve with any static host

cd ../backend
npm start
```

Set production `JWT_SECRET`, `MONGODB_URI`, and `FRONTEND_URL` before deploying.

## Further reading

Database migration notes: [MONGODB_MIGRATION.md](./MONGODB_MIGRATION.md)
