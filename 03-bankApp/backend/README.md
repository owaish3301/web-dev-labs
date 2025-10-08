# Bank App - Backend

This is the backend for a small bank application built as a learning project. It was my very first fullstack app. The backend is a Node.js/Express server that provides authentication and transaction APIs used by the frontend.

Note: Password hashing has not been implemented yet — this is a learning gap I'll add later when I learn about hashing (bcrypt, argon2, etc.). Do not use this code as-is in production.

## Tech stack
- Node.js
- Express
- (Any database used by the project — check `connection.js`)

## Setup
These instructions assume you're on Windows using PowerShell (the default in this workspace). Adjust commands for other shells as needed.

1. Open a terminal and change to the backend folder:

   ```powershell
   cd 02-bankApp/backend
   ```

2. Install dependencies:

   ```powershell
   npm install
   ```

3. Create a `.env` file from the provided sample:

   ```powershell
   copy .env.sample .env
   ```

4. Start the server (development):

   ```powershell
   npm run dev
   ```

   or for production-style start:

   ```powershell
   npm start
   ```

## Environment variables
Copy `./.env.sample` to `.env` and fill in real values. The sample file provided contains the typical variables used by this project.

## API
The backend exposes routes for authentication and transactions. See the `routes/` directory for route names and the `controller/` folder for behavior.

## Security note
This project is for learning. Passwords are not hashed yet and there may be other security or validation gaps. Do not use this code to store real user data or deploy to production.

## License
MIT
