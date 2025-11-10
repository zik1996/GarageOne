# GarageOne

# Smart Garage — MERN Project Roadmap & Flowchart

> Reference: Smart Garage Application. This document outlines an end-to-end flow, architecture, folder structure, API design, UI components, testing, and step-by-step tasks to produce a working MERN app using **React (Vite)** + **Axios** + **Formik/Yup** + **TailwindCSS + DaisyUI** and **Node.js + Express + MongoDB**.

---

## 1. Project Goal (short)

A web app to manage a smart garage: vehicle profiles, booking service slots, IoT status (doors, sensors), mechanics dashboard, invoices, and admin settings. Authentication for users and mechanics, real-time status for garage devices, and historical service records.

## 2. High-Level Flow (textual flowchart)

1. **Visitor** → views public pages (home, services, contact)
2. **Sign up / Login** → create user profile
3. **User Dashboard** → view vehicles, book service, view bookings & invoices
4. **Book Service** → select vehicle, choose service type, choose date/time → submit
5. **Garage System** → booking stored in MongoDB; optional push to mechanic queue
6. **Mechanic Dashboard** → view assigned bookings, update job status, add notes, generate invoice
7. **IoT / Device Status** → (optional) fetch garage sensor data via REST or WebSocket and show on dashboard
8. **Admin** → manage services, pricing, mechanics, view reports

(If you want a visual mermaid diagram I can generate it in the next step.)

---

## 3. Architecture

* **Frontend (React Vite)**: component-based UI, Formik + Yup for forms, Axios for API calls, Tailwind + DaisyUI for styling, React Router for routes.
* **Backend (Node + Express)**: REST API, JWT auth, role-based middleware (user, mechanic, admin). Mongoose ODM for MongoDB models.
* **Database**: MongoDB (Atlas or local). Collections: users, vehicles, bookings, services, mechanics, invoices, device_status.
* **Optional Real-time**: Socket.IO for device statuses and live booking updates.

---

## 4. Folder Structure (recommended)

```
smart-garage/
├─ backend/
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ middlewares/
│  │  ├─ services/        # business logic
│  │  ├─ utils/
│  │  └─ index.js
│  ├─ .env
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ hooks/
│  │  ├─ services/       # axios wrappers
│  │  ├─ utils/
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ tailwind.config.js
│  └─ package.json
└─ README.md
```

---

## 5. Key Data Models (Mongoose sketch)

* **User**: `{ _id, name, email, passwordHash, role: ['user','mechanic','admin'], phone, createdAt }`
* **Vehicle**: `{ _id, userId, make, model, year, registrationNo, notes }`
* **Service**: `{ _id, name, durationMinutes, price, description }`
* **Booking**: `{ _id, userId, vehicleId, serviceId, mechanicId?, status: ['pending','assigned','in_progress','completed','cancelled'], slotStart, slotEnd, notes, invoiceId? }`
* **Invoice**: `{ _id, bookingId, amount, tax, total, paid: boolean, createdAt }`
* **DeviceStatus** (optional): `{ _id, deviceId, type, value, timestamp }`

---

## 6. REST API endpoints (priority list)

**Auth**

* `POST /api/auth/register` — register new user
* `POST /api/auth/login` — get JWT
* `GET /api/auth/me` — get user profile

**Users / Vehicles**

* `GET /api/users/:id`
* `POST /api/vehicles` — add vehicle
* `GET /api/vehicles` — list user vehicles

**Services & Bookings**

* `GET /api/services` — list available services
* `POST /api/bookings` — create booking (user)
* `GET /api/bookings` — list bookings (filter by role)
* `PATCH /api/bookings/:id` — update booking status (mechanic/admin)

**Invoices**

* `GET /api/invoices/:id`
* `POST /api/invoices` — create invoice

**Admin**

* CRUD endpoints for services, mechanics, reports

---

## 7. Frontend Pages & Components

**Pages**

* `Home`, `Login`, `Register`, `UserDashboard`, `MechanicDashboard`, `AdminPanel`, `BookingPage`, `InvoicePage`, `Profile`, `ServiceList`

**Reusable components**

* `AuthForm` (Formik + Yup)
* `ProtectedRoute` (guards by role)
* `ServiceCard`, `VehicleCard`, `BookingForm`, `BookingList`, `StatusBadge`, `Navbar`, `Toast` (notifications)

**Services (axios wrappers)**

* `api/auth.js`, `api/bookings.js`, `api/services.js`, `api/vehicles.js` — export functions that call backend and centrally handle token headers and errors.

---

## 8. Styling & Forms

* Use Tailwind for utility classes; DaisyUI for quick component styles (cards, buttons, modals).
* Use Formik + Yup for form state + validation. Keep schemas small and reusable (e.g., vehicleSchema, bookingSchema).

---

## 9. Priority Implementation Plan (sprint-by-sprint)

**Sprint 0 — Setup (1 day)**

* Initialize monorepo with `backend` and `frontend` folders.
* Setup ESLint, Prettier, Tailwind, and basic README.

**Sprint 1 — Auth + Models (2–3 days)**

* Implement user model, auth routes, JWT middleware.
* Frontend: Login/Register pages + `AuthForm` and auth context/provider.

**Sprint 2 — Vehicles & Services (2 days)**

* Backend: vehicle and service models + endpoints.
* Frontend: Add vehicle page, service listing.

**Sprint 3 — Bookings flow (3–5 days)**

* Backend: bookings model and endpoints, basic validation.
* Frontend: Booking page (select vehicle + service + slot), bookings list page.

**Sprint 4 — Mechanic Dashboard & Invoicing (3 days)**

* Mechanic views, update booking status, create invoice.

**Sprint 5 — Optional real-time & admin features (2–4 days)**

* Add Socket.IO for device statuses and live updates; admin CRUD and reports.

---

## 10. Testing Strategy

* **Backend**

  * Unit tests: controllers & utils with Jest + Supertest (endpoint integration tests).
  * Test cases: auth flows, booking creation + conflict handling, role-based access.
* **Frontend**

  * Unit tests for components with React Testing Library + Vitest.
  * Integration tests: simulate booking flow (login → book → check booking list).
* **E2E**

  * Cypress (or Playwright): critical flows (register, login, book, complete booking).

For each test include: purpose, preconditions, steps, expected result.

---

## 11. CI/CD & Deployment

* Use GitHub Actions pipeline: `lint`, `test`, `build`, `deploy`.
* Deploy backend to Heroku / Render / Railway; frontend to Vercel / Netlify; MongoDB via Atlas.

---

## 12. Security & Best Practices

* Hash passwords with bcrypt, store secrets in `.env`.
* Use helmet, rate-limit, CORS config.
* Validate inputs server-side (Joi or express-validator) and client-side (Yup).
* Enforce role-based authorization for sensitive endpoints.

---

## 13. Initial Commands to Scaffold

**Frontend (Vite + React)**

```bash
# from project root
cd frontend
npm create vite@latest . -- --template react
npm install
npm i axios formik yup react-router-dom tailwindcss daisyui
# then configure tailwind per docs
```

**Backend (Node + Express)**

```bash
cd backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv cors helmet express-rate-limit
npm install -D nodemon jest supertest
```

---

## 14. Deliverables I prepared for you

1. Flow & architecture (this doc)
2. Priority backlog & sprint plan
3. Data models & endpoint list
4. Testing plan outline

---

## 15. Next steps I can do for you (choose one)

* Generate **complete backend scaffold** (copy-paste code): models, auth, bookings, controllers, and example tests.
* Generate **frontend scaffold** (Vite app): routes, auth context, axios service, components and pages with Formik forms.
* Produce **Mermaid flowchart** and exportable PNG/SVG for the flow.
* Start writing **unit & e2e test cases** (Jest + Cypress) for critical flows.

Tell me which next step you want and I will generate copy-paste-ready code for that step.

---

*End of document.*
