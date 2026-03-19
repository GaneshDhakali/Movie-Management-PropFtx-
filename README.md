# 🎬 Cineplex – Full Stack Movie Management Application

---

##  Features

- Add new movies with **name, genre, release year and rating**
- Update movies using **inline edit mode**
- Delete movies with **confirmation popup**
- Search movies by name with **case-insensitive backend filtering**
- **Frontend + Backend validation**
  - Rating restricted between **1 – 10**
  - Release year restricted between **1888 – Current Year**
- **Auto refresh movie list** after CRUD operations
- **Loading indicator** during API calls
- **Error toast notification** with auto-dismiss
- Sticky **glass navigation header**
- Cinematic **rolling hero movie cards**
- Rating colour logic (**Low / Medium / High**)
- Responsive **OTT-style card layout**
- Smooth **hover micro-interactions**
- Cloud deployment (Frontend + Backend)

---

##  Tech Stack

### Frontend
- React.js
- Axios
- Inline CSS (Glassmorphism UI)
- Environment Variables

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- MVC Architecture
- Custom Middleware Validation
- Global Error Handler

---

##  Project Structure

### Backend (MVC)

backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── server.js

### Frontend

frontend/
│
├── public/
├── src/
│ ├── App.js
│ ├── index.js
│ └── styles


---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/movies | Fetch all movies |
| POST | /api/movies | Create new movie |
| PUT | /api/movies/:id | Update movie |
| DELETE | /api/movies/:id | Delete movie |
| GET | /api/movies/search?name= | Search movie |

---

## 🌐 Live Deployment

**Backend (Render)**  
https://cineplex-backend-22vo.onrender.com/api/movies  

**Frontend (Netlify)**  
https://cineplex-22.netlify.app/

> NOTE: SINCE THE BACKEND SERVER IS HOSTED ON A FREE HOSTING SERVICE, THE SERVER MAY TAKE A FEW SECONDS FOR THE FIRST REQUEST AS THE HOSTED INSTANCE NEED TO WAKE UP.

---
## ✅ Enhancements Implemented

- Strengthened validation on both frontend and backend layers
- Optimised movie search behaviour by triggering search on user action
- Improved UI responsiveness across different screen sizes
- Introduced cinematic hero banner and glass card styling
- Added rating visual indicators and hover micro-interactions
- Refactored project structure and improved Git hygiene practices

---

### Run Backend

cd backend
npm install
npm run dev

### Run Frontend

cd backend
npm install
npm run dev


### Run Both (Concurrent Mode)

npm install
npm run dev

