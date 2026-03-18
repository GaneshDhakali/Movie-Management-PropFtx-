# 🎬 Cineplex – Movie Management App

## Features

* Add, update and delete movies with details like name, genre, release year and 
  rating
* Search movies by name with case-insensitive matching
* Confirmation prompt before deleting a movie
* Loading indicator during API requests for better user feedback
* Error message display with automatic dismissal
* Inline edit mode for quick movie updates
* Automatic refresh of movie list after successful operations
* MongoDB schema validation for required fields and rating limits
* Clean MVC-based backend structure with centralized error handling
* RESTful API integration between React frontend and Express backend
* Responsive card-based UI for movie listing
* Deployment of frontend and backend on cloud platforms


---

## Tech Stack

### Frontend

* React.js
* Axios
* Inline CSS styling

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## Project Structure

Backend follows a simple MVC pattern:

* **models/** → MongoDB schema
* **controllers/** → Business logic for CRUD operations
* **routes/** → API routes
* **middleware/** → Validation and global error handling

Frontend is built using functional components and React hooks for state management.

---

## API Endpoints

 |Method  |  Endpoint               |   Description    
 |------  |------------------------ | -------------- 
 |GET     | /api/movies             |   Get all movies 
 |POST    | /api/movies             |   Create movie   
 |PUT     | /api/movies/:id         |   Update movie   
 |DELETE  | /api/movies/:id         |   Delete movie   
 |GET     | /api/movies/search?name=|   Search movie  

---

## Deployment

* Backend deployed on **Render**  
* Frontend deployed on **Vercel / Netlify**

## LINKS

* Backend : https://cineplex-backend-22vo.onrender.com/api/movies
* Frontend: https://cineplex-moviemanager.netlify.app/

NOTE: SINCE THE BACKEND SERVER IS HOSTED ON A FREE HOSTING SERVICE, THE SERVER MAY TAKE A FEW SECONDS FOR THE FIRST REQUEST AS THE HOSTED INSTANCE NEED TO WAKE UP.
---

##  How to Run Locally

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm start
```
### Run Both Using Concurrently

```
npm run dev
```
