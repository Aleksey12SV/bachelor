# Quick deploy (recommended)

This file describes a fast deployment path: static frontend on Netlify/Vercel and backend on Render/Cloud Run.

Frontend (Netlify / Vercel)
- Option A (recommended): Connect your GitHub repo to Netlify or Vercel and set the build command to:

  npm ci && npm run build

  Publish directory: `dist`

- Option B: Build locally and drag-and-drop the `dist` folder in Netlify, or use Vercel CLI:

```bash
cd frontend
npm ci
npm run build
# deploy to Vercel (if installed)
vercel --prod
```

Backend (Render / Cloud Run)
- Option A (Render): Create a new Web Service, connect to repo and use the provided Dockerfile. Render will build the image and deploy.

- Option B (Cloud Run): Build and push an image, then deploy to Cloud Run.

```bash
# build locally and test
cd backend/app/app
docker build -t youruser/app-backend:latest .
docker run --rm -p 8080:8080 youruser/app-backend:latest

# push to registry (Docker Hub)
docker tag youruser/app-backend:latest yourdockerhub/youruser/app-backend:latest
docker push yourdockerhub/youruser/app-backend:latest

# or use Google Cloud Build + Cloud Run
gcloud builds submit --tag gcr.io/PROJECT_ID/app-backend:latest
gcloud run deploy app-backend --image gcr.io/PROJECT_ID/app-backend:latest --platform managed --region REGION --allow-unauthenticated
```

Environment & production notes
- Use managed DB (Cloud SQL / RDS / Azure Database). Set `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD` as service env variables.
- Keep `application.properties` defaults as disabled for SQL init (production). Use the `local` profile for local development only.
- Store secrets in provider secret manager or service env variables.

Local test with Docker Compose (optional)
- If you want to test locally with DB, I can generate `docker-compose.yml` including MySQL, backend, and optionally frontend.
