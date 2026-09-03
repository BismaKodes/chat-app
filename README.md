# Chat App

A real-time chat application backend built with Node.js, Express.js, MongoDB, JWT authentication, and Socket.io.

## Features

- User signup and login
- JWT-based authentication
- Protected routes
- Secure password hashing with bcrypt
- MongoDB database integration
- Real-time communication using Socket.io
- JWT authentication for Socket.io connections
- Authenticated socket connections
- Real-time messaging

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Socket.io
- Postman

## Project Structure

```text
chat-app/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
│
├── app.js
├── server.js
├── db.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## Installation

### 1. Clone the repository

```cmd
git clone https://github.com/BismaKodes/chat-app.git
```

### 2. Navigate to the project directory

```cmd
cd chat-app
```

### 3. Install dependencies

```cmd
npm install
```

### 4. Create a `.env` file

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### 5. Start the server

```cmd
npm start
```

### 6. Run in development mode

```cmd
npm run dev
```

The server will run at:

```text
http://localhost:3000
```

## Authentication

The application uses JSON Web Tokens (JWT) for authentication.

Users can create an account and log in using their credentials. After successful login, an authentication token is generated and used to access protected resources.

Authentication middleware verifies the token before allowing access to protected routes.

## Real-Time Communication

Socket.io is used to provide real-time communication between connected users.

The Socket.io connection is authenticated using the user's JWT token. The server verifies the token during the socket connection and allows authenticated users to establish a real-time connection.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

## Testing

API endpoints can be tested using Postman.

Socket.io functionality can be tested using a Socket.io-compatible client or frontend application.

## Security

- Passwords are hashed before being stored in the database.
- Protected routes require valid JWT authentication.
- Socket.io connections are authenticated using JWT.
- Sensitive configuration values are stored in environment variables.
- The `.env` file is excluded from version control.

## Future Improvements

- One-to-one private messaging
- Group chats
- Message history
- Typing indicators
- Online/offline status
- Message read receipts
- Media and file sharing

## Author

**Bisma Ali**

GitHub: https://github.com/BismaKodes