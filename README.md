## E-Commerce Website (Flipkart-like)

This is a full-stack e-commerce website built with:

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express, MongoDB (via Mongoose)

It includes user authentication, product listing, and basic cart functionality.

### Structure

- `frontend/` – React single-page application
- `backend/` – Express API server with MongoDB

See the detailed instructions below for **development** and **deployment**.

### Getting started (development)

1. **Install dependencies**

   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

2. **Configure environment variables**

   In `backend/.env`:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=super_secret_jwt_key
   PORT=5000
   ```

   In `frontend/.env`:

   ```bash
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. **Run the backend**

   ```bash
   cd backend
   npm run dev
   ```

4. **Run the frontend**

   ```bash
   cd frontend
   npm run dev
   ```

Visit the printed frontend URL (usually `http://localhost:5173`) in your browser.

### Deployment overview

- **Backend**: deploy `backend/` to a Node-friendly host (Render, Railway, etc.).  
  - Set `MONGODB_URI` using MongoDB Atlas.  
  - Set `JWT_SECRET` and `PORT` environment variables.  
  - Expose the server base URL, e.g. `https://your-backend.onrender.com`.
- **Frontend**: deploy `frontend/` to a static host (Vercel, Netlify, etc.).  
  - Set `VITE_API_BASE_URL` to the deployed backend API URL, e.g. `https://your-backend.onrender.com/api`.
  - Build with `npm run build` and deploy the `dist/` output if needed.


