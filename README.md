<div align="center">

# Vehicle Explorer

Pick a car make and a model year, then see its vehicle types and models.<br/>
Data comes from the [NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/).<br/>
Architecture and decisions: [DECISIONS.md](DECISIONS.md)

**Live:** http://13.60.186.86/

![.NET](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Redis](https://img.shields.io/badge/Redis-8-DC382D?logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

</div>

## Quick start

```bash
git clone https://github.com/fuad-bassam/Fuad-Vehicle-Explorer-App.git
cd Fuad-Vehicle-Explorer-App
docker compose up --build
```

App: http://localhost:3000 · Swagger: http://localhost:5080/swagger

**Without Docker:** run `dotnet run --project backend/Web`, then in `frontend/` copy `.env.example` to `.env.local` and run `npm ci && npm run dev`.

**Tests:** `dotnet test backend/VehicleExplorer.sln`, and for the web app `npm run lint`, `npm run type-check`, `npm run build`.

## Deploy

The app runs on one AWS EC2 instance (free tier) with Docker Compose. Every merge to `main` runs [deploy.yml](.github/workflows/deploy.yml): it builds both images, pushes them to GitHub Container Registry and restarts the app on the server.

## Settings

| Variable | Default | What it does |
|---|---|---|
| `WEB_PORT`, `API_PORT` | `3000`, `5080` | Ports on your machine (Docker) |
| `API_BASE_URL` | `http://api:8080/` in Docker | Where the web app calls the API |
| `ConnectionStrings__Redis` | `redis:6379` in Docker, empty locally | Redis for the cache. Empty means memory only |
| `Vpic__CacheHours` | `24` | How long vPIC answers stay in the cache |
| `RateLimiting__PermitLimit` | `100` | API calls per minute per user |

The API settings live in `backend/Web/appsettings.json`, and any of them can be changed with an environment variable.

## API

| Endpoint | Returns |
|---|---|
| `GET /api/makes?keyword=hon` | Makes that match the keyword |
| `GET /api/makes/{makeId}` | One make |
| `GET /api/makes/{makeId}/vehicle-types` | The make's vehicle types |
| `GET /api/makes/{makeId}/models?year=2015&vehicleType=Truck` | The make's models for that year |

Every response has the same shape: `result`, `isSuccessful`, `errorCodes` and `errors`.

## Author

**Fuad Bassam** · Full-Stack Developer · Amman, Jordan

[![LinkedIn](https://img.shields.io/badge/LinkedIn-fuad--bassam-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/fuad-bassam)
[![GitHub](https://img.shields.io/badge/GitHub-fuad--bassam-181717?logo=github&logoColor=white)](https://github.com/fuad-bassam)
[![Email](https://img.shields.io/badge/Email-fuadabuawad55%40gmail.com-EA4335?logo=gmail&logoColor=white)](mailto:fuadabuawad55@gmail.com)

Phone: +962 790 941 468
