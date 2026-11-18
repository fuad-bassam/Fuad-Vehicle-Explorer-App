# Vehicle Explorer

Pick a car make and a model year, then see the make's vehicle types and the matching models. Data comes from the public [NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/).

| Part | Stack | Folder |
|---|---|---|
| API | .NET 10 Web API | `backend/` |
| Web | Next.js 16 + React 19 | `frontend/` |

Design notes live in [DECISIONS.md](DECISIONS.md).

## Run with Docker

Needs [Docker](https://docs.docker.com/get-docker/) with Compose.

```bash
git clone https://github.com/fuad-bassam/Fuad-Vehicle-Explorer-App.git
cd Fuad-Vehicle-Explorer-App
docker compose up --build
```

- Web app: http://localhost:3000
- API (Swagger): http://localhost:5080/swagger
- API health check: http://localhost:5080/health

Change the ports with `WEB_PORT` and `API_PORT`, for example `WEB_PORT=8000 docker compose up --build`. Stop with `docker compose down`.
