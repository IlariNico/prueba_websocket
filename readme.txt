# WebSocket Event Chat

This project demonstrates an event system with real-time chat using WebSockets, TypeScript and TypeORM.

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

The server uses SQLite database `db.sqlite` and exposes the following endpoints:

- `POST /users` – create a user `{ name }`
- `POST /events` – create an event `{ title, description, ownerId }` generating a `roomId`
- `GET /events/:id/messages` – list messages for an event

Clients connect to the WebSocket server and join the event using its `roomId`.

