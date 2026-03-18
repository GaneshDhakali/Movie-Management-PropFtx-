import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  // storing all movies fetched from backend
  const [movies, setMovies] = useState([]);

  // form state for adding / editing movie
  const [form, setForm] = useState({
    movieName: "",
    genre: "",
    releaseYear: "",
    rating: ""
  });

  // if user clicks edit we store that movie id here
  const [editingId, setEditingId] = useState(null);

  // search input value
  const [search, setSearch] = useState("");

  // used to show error toast message
  const [errorMsg, setErrorMsg] = useState("");

  // simple loading state for API calls
  const [loading, setLoading] = useState(false);

  // fetch movies once page loads
  useEffect(() => {
    fetchMovies();
  }, []);

  // function to get all movies
  const fetchMovies = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await axios.get(
        "https://cineplex-backend-22vo.onrender.com/api/movies"
      );

      setMovies(res.data.data);

    } catch (error) {
      console.log(error);
      setErrorMsg("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  // searching movies by name
  const searchMovies = async (value) => {

    setSearch(value);

    // if search box cleared load full list again
    if (value === "") {
      fetchMovies();
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const res = await axios.get(
        `https://cineplex-backend-22vo.onrender.com/api/movies/search?name=${value}`
      );

      setMovies(res.data.data);

    } catch (error) {
      console.log(error);
      setErrorMsg("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // auto remove error message after few seconds
  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => {
        setErrorMsg("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  // updating form input values
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // handles both add and update movie
  const addMovie = async (e) => {
    e.preventDefault();

    const year = Number(form.releaseYear);
    const rate = Number(form.rating);
    const currentYear = new Date().getFullYear();

    if (!form.movieName || !form.genre || !form.releaseYear || !form.rating) {
      setErrorMsg("All fields required");
      return;
    }

    if (year < 1888 || year > currentYear) {
      setErrorMsg("Enter valid release year");
      return;
    }

    if (rate < 1 || rate > 10) {
      setErrorMsg("Rating must be between 1 and 10");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      if (editingId) {
        // updating existing movie
        await axios.put(
          `https://cineplex-backend-22vo.onrender.com/api/movies/${editingId}`,
          form
        );
        setEditingId(null);
      } else {
        // adding new movie
        await axios.post(
          "https://cineplex-backend-22vo.onrender.com/api/movies",
          form
        );
      }

      // refresh list after success
      await fetchMovies();

      // reset search and form
      setSearch("");

      setForm({
        movieName: "",
        genre: "",
        releaseYear: "",
        rating: ""
      });

    } catch (error) {

      // showing backend error if present
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong");
      }

    } finally {
      setLoading(false);
    }
  };

  // delete movie with confirmation popup
  const deleteMovie = async (id) => {

    if (!window.confirm("Are you sure you want to delete this movie?"))
      return;

    try {
      await axios.delete(`https://cineplex-backend-22vo.onrender.com/api/movies/${id}`);
      await fetchMovies();
    } catch (error) {
      setErrorMsg("Delete failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background:
          "radial-gradient(circle at 20% 20%, rgba(0,140,255,0.25), transparent 40%), radial-gradient(circle at 80% 10%, rgba(0,200,255,0.18), transparent 40%), radial-gradient(circle at 50% 90%, rgba(0,80,160,0.25), transparent 40%), linear-gradient(180deg, #02070d 0%, #04111c 50%, #01060b 100%)",
        fontFamily: "Arial"
      }}
    >
    {errorMsg && (
      <div
        style={{
          position:"fixed",
          top:"20px",
          right:"20px",
          background:"#ff5252",
          padding:"12px 20px",
          color:"white",
          borderRadius:"8px",
          boxShadow:"0 10px 25px rgba(0,0,0,0.5)",
          zIndex:1000
        }}
      >
        {errorMsg}
      </div>
    )}
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        flexWrap:"wrap",
        gap:"10px",
        alignItems: "center",
        padding: "15px 20px",
        marginBottom: "40px",
        backdropFilter: "blur(12px)",
        background: "rgba(0,0,0,0.35)",
        borderRadius: "12px"
      }}
    >

        <h2
          style={{
            fontSize: "26px",
            fontWeight: "800",
            letterSpacing: "2px",
            background: "linear-gradient(90deg,#00e5ff,#4fc3f7,#81d4fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 12px rgba(255, 162, 0, 0.9)",
            cursor: "pointer"
          }}
          >
          🎬CINEPLEX
        </h2>
    
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

        <input
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 14px",
            borderRadius: "20px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.1)",
            color: "white"
          }}
        />

        <button
          onClick={() => searchMovies(search)}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Search
        </button>

      </div> 

    </div>    

      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "30px",
          fontSize: "36px"
        }}
      >
        Movies
      </h1>

      <form
        onSubmit={addMovie} noValidate
        style={{
          display:"flex",
          justifyContent:"center",
          gap:"10px",
          flexWrap:"wrap",
          width:"100%",
          maxWidth:"1100px",
          margin:"0 auto 40px auto"
        }}
      >

        <input
          name="movieName"
          placeholder="Movie Name"
          value={form.movieName}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="releaseYear"
          maxLength="4"
          placeholder="Release Year"
          value={form.releaseYear}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d{0,4}$/.test(value)) {
              setForm({ ...form, releaseYear: value });
            }
          }}
          style={inputStyle}
        />

        <input
          type="number"
          name="rating"
          step="0.1"
          min="1"
          max="10"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
          style={inputStyle}
        />

        <button style={addBtn}>
          {editingId ? "Update Movie" : "Add Movie"}
        </button>

      </form>

      {loading ? (

          <h2 style={{color:"white", textAlign:"center"}}>
            Loading movies...
          </h2>

        ) : movies.length === 0 ? (

          <h2 style={{color:"white", textAlign:"center"}}>
            No movies found! 
          </h2>

        ) : (

          <div
            style={{
              display:"flex",
              flexWrap:"wrap",
              justifyContent:"center",
              gap:"20px"
            }}
          >
          {movies.map((movie) => (

            <div
              key={movie._id}
              style={cardStyle}
              onMouseEnter={(e)=>{
                e.currentTarget.style.transform="scale(1.07)";
                e.currentTarget.style.boxShadow="0 30px 60px rgba(0,0,0,1)";
              }}
              onMouseLeave={(e)=>{
                e.currentTarget.style.transform="scale(1)";
                e.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,0.7)";
              }}
            >
              <h3 style={{color:"white"}}>{movie.movieName}</h3>
              <p style={{color:"#cfd8dc"}}><b>Genre:</b> {movie.genre}</p>
              <p style={{color:"#cfd8dc"}}><b>Year:</b> {movie.releaseYear}</p>
              <p style={{color:"#ffcc00"}}>⭐ {movie.rating}</p>

              <div style={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>

                <button
                  style={editBtn}
                  onClick={()=>{
                    setForm({
                      movieName: movie.movieName,
                      genre: movie.genre,
                      releaseYear: movie.releaseYear,
                      rating: movie.rating
                    });
                    setEditingId(movie._id);
                  }}
                >
                  Edit
                </button>

                <button
                  style={deleteBtn}
                  onClick={()=>deleteMovie(movie._id)}
                >
                  Delete
                </button>

              </div>

            </div>

        ))}

       </div>

      )}</div>
  );
}

const inputStyle = {
  padding:"10px",
  borderRadius:"6px",
  border:"none",
  width:"100%",
  maxWidth:"220px"
};

const addBtn = {
  padding:"10px 20px",
  background:"#ff9800",
  border:"none",
  borderRadius:"6px",
  cursor:"pointer",
  fontWeight:"bold"
};

const cardStyle = {
  width: "100%",
  maxWidth:"220px",
  background: "linear-gradient(145deg,#1b2c36,#0f1f29)",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.7)",
  transition: "0.35s",
  cursor: "pointer"
};

const editBtn = {
  background:"#2196f3",
  border:"none",
  padding:"6px 12px",
  color:"white",
  borderRadius:"6px",
  cursor:"pointer"
};

const deleteBtn = {
  background:"#e50914",
  border:"none",
  padding:"6px 12px",
  color:"white",
  borderRadius:"6px",
  cursor:"pointer"
};

export default App;