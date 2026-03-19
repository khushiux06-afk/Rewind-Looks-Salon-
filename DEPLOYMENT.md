# Rewind Looks Salon - Setup and Deployment Guide

## 1. Run Backend Locally

The backend is built with Node.js and Express, and uses MongoDB for the database.

1.  Make sure you have [Node.js](https://nodejs.org/) installed.
2.  Make sure you have [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and running locally, or use a MongoDB Atlas cloud URI.
3.  Open a terminal and navigate to the backend folder:
    ```bash
    cd backend
    ```
4.  Install dependencies:
    ```bash
    npm install
    ```
5.  Set your environment variables. You can create a `.env` file in the `backend/` folder:
    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/rewind-looks
    ```
6.  Start the server:
    ```bash
    npm start
    ```
7.  The server should now be running on `http://localhost:5000`.

## 2. Run Frontend Locally

The frontend is built with pure HTML, CSS, and vanilla JS. It does not require a build step to run locally.

1.  To get the absolute best experience (to avoid CORS issues if opening via `file://`), run a simple local web server in the `frontend/` directory.
2.  If you have Python installed:
    ```bash
    cd frontend
    python -m http.server 8000
    ```
3.  Or using Node's `serve`:
    ```bash
    npx serve frontend
    ```
4.  Navigate to `http://localhost:8000` or `http://localhost:3000` (depending on the server used) in your browser.
5.  *Note:* The frontend expects the backend to be running on `http://localhost:5000` for API calls to work for Bookings, Contacts, and Products.

## 3. Connect MongoDB

1.  If hosting locally, ensure `mongod` is running. The app connects to `mongodb://localhost:27017/rewind-looks` by default.
2.  For a production environment, create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
3.  Get your connection string and add it to your backend's environment variables (e.g., in Render/Railway dashboard) as `MONGODB_URI`.

## 4. Deployment Instructions

### Backend → Render / Railway

1.  Push your code to GitHub.
2.  Go to [Render.com](https://render.com) or [Railway.app](https://railway.app).
3.  Create a new Web Service.
4.  Connect your GitHub repository to the service.
5.  Set the *Root Directory* to `backend`.
6.  Set the *Build Command* to `npm install`.
7.  Set the *Start Command* to `npm start`.
8.  Add the `MONGODB_URI` environment variable with your MongoDB Atlas connection string.
9.  Deploy the service.
10. Note the deployed URL (e.g., `https://rewind-salon-api.onrender.com`).

### Frontend → Netlify / Vercel

*Important:* Before deploying the frontend, update the API URLs in `frontend/js/main.js`, `frontend/contact.html`, `frontend/book.html`, and `frontend/products.html` from `http://localhost:5000` to your deployed backend URL.

1.  Go to [Netlify.com](https://netlify.com) or [Vercel.com](https://vercel.com).
2.  Add a new site and connect your GitHub repository.
3.  Set the *Base Directory* / *Publish Directory* to `frontend`.
4.  Leave Build Command empty (as it's static HTML/CSS).
5.  Deploy the site.
6.  Your site will be live immediately!
