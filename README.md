# Secure Connect and Communication Platform

Lab 4 project for Web Dev III. This backend provides user authentication, protected personal notes, and authenticated real-time chat.

## Features

- Signup and login with bcrypt password hashing and JWT authentication
- Protected notes API with create, read, update, and delete operations
- Role-aware access to notes (`user` and `admin`)
- JWT-authenticated Socket.IO chat
- Node.js `EventEmitter` events for chat activity
- MongoDB persistence through Mongoose

## Requirements

- Node.js and npm
- MongoDB Atlas cluster or local MongoDB instance

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root using `.env.example` as a template:

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/secureconnect?retryWrites=true&w=majority
   JWT_SECRET=replace_with_a_long_random_secret
   ```

   Replace the MongoDB placeholders with your own connection details. Keep `.env` private; do not commit it.

3. Start the server:

   ```bash
   npm run dev
   ```

   The server connects to MongoDB and listens on `http://localhost:5000`.

## API endpoints

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| `GET` | `/` | No | API health message |
| `POST` | `/api/auth/signup` | No | Create a user |
| `POST` | `/api/auth/login` | No | Log in and receive a JWT |
| `POST` | `/api/notes` | Bearer JWT | Create a note |
| `GET` | `/api/notes` | Bearer JWT | List the signed-in user's notes |
| `PUT` | `/api/notes/:id` | Bearer JWT | Update an owned note |
| `DELETE` | `/api/notes/:id` | Bearer JWT | Delete an owned note |

Send protected requests with this header:

```text
Authorization: Bearer YOUR_JWT
```

Signup JSON example:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "your-password"
}
```

Note JSON example:

```json
{
  "title": "My note",
  "content": "Private note content"
}
```

## Socket.IO chat

Connect to `http://localhost:5000` with the JWT in the Socket.IO auth object:

```js
const socket = io("http://localhost:5000", {
  auth: { token: "YOUR_JWT" }
});
```

Emit `chat:message` with a message string and listen for `chat:message` to receive messages.

## Assignment screenshots

Postman screenshots for signup, login, and protected notes:

### Fig 1. Signup and login responses

Signup response:

![Signup response](./screenshots/signup-response.png)

Login response:

![Login response](./screenshots/login-response.png)

### Fig 2. Protected Notes API

Show the Notes API returning `401` without a token and succeeding with a valid JWT.

Without a token:

![Notes API without a token](./screenshots/notes-no-token.png)

With a valid token:

![Notes API with a valid token](./screenshots/notes-valid-token.png)

