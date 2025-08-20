# WebSocket Event Chat

This project demonstrates an event system with real-time chat using WebSockets, TypeScript and TypeORM backed by PostgreSQL.

## Setup

```bash
npm install
npm run build
npm start
```

During development you can run:

```bash
npm run dev
```

Environment variables can be used to configure the database:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=events
JWT_SECRET=secretKey
```

The server exposes the following endpoints:

- `POST /users` – register a user `{ username, email, password }`
- `POST /auth/login` – obtain a JWT token `{ username, password }`
- `POST /events` – create an event `{ title, description, ownerId }` generating a `roomId`
- `GET /events/:id/messages` – list messages for an event
- `GET /events/user/:id` – list events for a user including the `roomId`

Clients connect to the WebSocket server and join the event using its `roomId` sending the JWT token in the `auth` handshake, e.g. `io("/", { auth: { token } })`.

## Frontend

A minimal TypeScript frontend resides in `frontend/`. Build it with:

```bash
npm --prefix frontend install
npm --prefix frontend run build
```

Open `frontend/index.html` in a browser to log in, view your events, and chat in real time.

