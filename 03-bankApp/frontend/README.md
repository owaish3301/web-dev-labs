# Frontend Documentation

## Project Overview
This is the frontend of the bank application. It is built using React and Vite.
> Note: This is a learning project — my very first fullstack app. Password hashing is not yet implemented on the backend; I'll learn and add it later. Do not use this code in production.

## Installation
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the sample (optional — needed if you want to set API URL or other variables):

   On Windows PowerShell:

   ```powershell
   copy .env.sample .env
   ```

## Running the Application
To start the development server:
```bash
npm run dev
```

## Project Structure
- `src/`: Contains the source code.
  - `components/`: Reusable React components.
  - `pages/`: Page-level components like `SignUp`, `SignIn`, and `HomePage`.
- `public/`: Static assets.

## Key Features
- User authentication (SignUp, SignIn).
- Transaction history display.
- Responsive design.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License.
