# Enhancement

Customer storefront and admin dashboard for a central vacuum shop and service business. Shoppers browse products, request repairs, pay through Stripe, and track jobs. Staff manage catalog, quotes, technicians, and site content from `/admin`.

This Next.js app talks to the NestJS API in `VacuumCare-Server`. All authenticated calls go to `{NEXT_PUBLIC_API_URL}` (include the `/api` prefix).

## Stack

- Next.js 16 (App Router) + React 19
- Redux Toolkit Query for API access
- Tailwind CSS 4
- Docker image: `souravdebanth/vacuumcare-frontend:latest` (standalone Node server on port 3000)

## Prerequisites

- Node.js 22+
- npm
- A running Enhancement API (see the backend README)
- For image deploys: Docker Desktop or Docker Engine

## Environment

Copy `.env.example` to `.env.local` and point it at your API:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes | API origin **including** `/api`. Inlined at `next build` time. |
| `NEXT_PUBLIC_API_BASE_URL` | No | Alias used if `NEXT_PUBLIC_API_URL` is unset. |
| `NEXT_PUBLIC_BASE_URL` | No | Public site origin. Optional Docker build-arg only. |

`NEXT_PUBLIC_*` values are compiled into the client bundle. Changing the API URL requires a new build (or a new Docker image), not only a container restart.

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` as above. If the API is published from Docker Compose, the host port is `APP_PORT` from the backend `.env` (often `5001`), not the container `PORT`.

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000). Admin lives at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

Useful scripts: `npm run dev`, `npm run build`, `npm start` (production mode after a build), `npm run lint`.

## Docker

The image uses Next.js `output: "standalone"`. The process listens on `0.0.0.0:3000`.

### Build and run with Compose (recommended)

`.env.local` must exist in this folder (the image build copies public env from it). Compose also accepts build-args that override those values when they are non-empty.

```bash
# From aryegrunzweig-sd/
cp .env.example .env.local   # then edit NEXT_PUBLIC_API_URL

docker compose up --build
```

The app is served at [http://localhost:3000](http://localhost:3000).

To bake a different API URL without editing `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com/api docker compose up --build
```

### Build and run the image directly

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:5000/api \
  -t souravdebanth/vacuumcare-frontend:latest \
  .

docker run --rm -p 3000:3000 --name vacuum-frontend \
  souravdebanth/vacuumcare-frontend:latest
```

### Pull a published image

```bash
docker pull souravdebanth/vacuumcare-frontend:latest

docker run --rm -p 3000:3000 --name vacuum-frontend \
  souravdebanth/vacuumcare-frontend:latest
```

A pre-built image already contains the API URL from **its** build. If you need a different backend, rebuild with the matching `--build-arg` (or Compose env) instead of only changing runtime env.

## Project layout

```text
app/(main)/          Customer storefront routes
app/admin/           Admin dashboard
components/          Shared UI (home, services, admin, layout)
redux/features/api/  RTK Query endpoints
public/              Static assets
Dockerfile           Multi-stage production image
docker-compose.yaml  Local/image run on port 3000
```

## Backend pairing

Start PostgreSQL and the Nest API first (`VacuumCare-Server`). Swagger is at `{API origin}/docs`, for example `http://localhost:5000/api/docs`. CORS on the API must include this site's origin (`http://localhost:3000` for local work).
