# Week 2 — Node/Express API

Assignment: Build & Deploy Your API (BeTechified).

## Routes

| Method | Path        | Description                                  |
|--------|-------------|-----------------------------------------------|
| GET    | `/`         | Serves a static HTML page: "My Week 2 API!"   |
| POST   | `/user`     | Accepts `{ name, email }`, replies `Hello, [name]!` |
| GET    | `/user/:id` | Returns `User [id] profile`                   |

Includes:
- JSON body parsing (`express.json()`)
- Error handling — returns `400` if `name`/`email` are missing on `POST /user`
- `.env` support for `PORT`
- Custom logging middleware (bonus) — logs every request's method, path, and timestamp

## Setup

```bash
npm install
cp .env.example .env
npm start
```

Server runs at `http://localhost:3000` by default (or whatever `PORT` you set in `.env`).

## Testing

**Browser / curl — GET /**
```bash
curl http://localhost:3000/
```

**curl — POST /user**
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name": "Panshak", "email": "panshak@example.com"}'
```
Response:
```json
{ "message": "Hello, Panshak!", "user": { "id": 1, "name": "Panshak", "email": "panshak@example.com" } }
```

**Missing data (400 test)**
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name": "Panshak"}'
```
Response: `400` with `{ "error": "Both \"name\" and \"email\" are required." }`

**curl — GET /user/:id**
```bash
curl http://localhost:3000/user/1
```
Response:
```json
{ "message": "User 1 profile", "user": { "id": 1, "name": "Panshak", "email": "panshak@example.com" } }
```

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Week 2: Express API with GET/POST routes, error handling, .env, logging middleware"
git branch -M main
git remote add origin https://github.com/<your-username>/week2-node-express.git
git push -u origin main
```
