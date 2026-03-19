import { useEffect, useState } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

function App() {

  const [movies, setMovies] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [deletingId,setDeletingId]=useState(null);
  const [fade, setFade] = useState(true);

  const [form, setForm] = useState({
    movieName: "",
    genre: "",
    releaseYear: "",
    rating: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchMovies(); }, []);

  //  hero auto rolling
  useEffect(()=>{
    if(movies.length===0) return;

    const interval=setInterval(()=>{
      setFade(false);

      setTimeout(()=>{
        setHeroIndex(prev=> (prev+1)%movies.length);
        setFade(true);
      },300);

    },3000);

    return ()=>clearInterval(interval);

  },[movies]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await axios.get(`${API}/api/movies`);
      setMovies(res.data.data);
    } catch {
      setErrorMsg("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (value) => {
    setSearch(value);
    if (value === "") {
      fetchMovies();
      return;
    }
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await axios.get(`${API}/api/movies/search?name=${value}`);
      setMovies(res.data.data);
    } catch {
      setErrorMsg("Search failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMsg) {
      const t = setTimeout(() => setErrorMsg(""), 5000);
      return () => clearTimeout(t);
    }
  }, [errorMsg]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
        await axios.put(`${API}/api/movies/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(`${API}/api/movies`, form);
      }

      await fetchMovies();
      setSearch("");

      setForm({
        movieName: "",
        genre: "",
        releaseYear: "",
        rating: ""
      });

    } catch (error) {
      if (error.response) setErrorMsg(error.response.data.message);
      else setErrorMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (id) => {

  if (!window.confirm("Are you sure you want to delete this movie?"))
    return;

  setDeletingId(id);

  setTimeout(async () => {
    try {
      await axios.delete(`${API}/api/movies/${id}`);
      fetchMovies();
    } catch {
      setErrorMsg("Delete failed");
    }
    setDeletingId(null);
  },300);

};

  return (
    <div style={pageStyle}>

      {errorMsg && <div style={toast}>{errorMsg}</div>}

      {/*  Sticky Header */}
      <div style={header}>
       <h2
              onClick={()=>{
            fetchMovies();
            setSearch("");
            setEditingId(null);
            setForm({
              movieName:"",
              genre:"",
              releaseYear:"",
              rating:""
            });
          }}
          style={{
            fontSize: "30px",
            fontWeight: "800",
            letterSpacing: "2px",
            background: "linear-gradient(90deg,#00e5ff,#4fc3f7,#81d4fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 12px rgba(255, 162, 0, 0.9)",
            cursor: "pointer"
          }}
        >🎬 CINEPLEX</h2>

        <div style={{display:"flex",gap:10}}>
          <input
            placeholder="Search movies..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            style={searchInput}
          />
          <button style={searchBtn} onClick={()=>searchMovies(search)}>Search</button>
        </div>
      </div>

      {/*  NEW HERO ROLLING CINEMA */}
      {movies.length>0 && (
        <div style={{ ...heroCard, opacity: fade ? 1 : 0 }}>
          <h1
  style={{
    fontSize:"56px",
    fontWeight:"900",
    letterSpacing:"2px",
    marginBottom:"10px",
    textShadow:"0 0 20px rgba(0,0,0,0.9)"
  }}
>
  {movies[heroIndex].movieName}
</h1>

<p style={{opacity:0.8,fontSize:"18px"}}>
  {movies[heroIndex].genre}
</p>

<h2
  style={{
    marginTop:"8px",
    color:"#ffd54f",
    textShadow:"0 0 14px rgba(255,200,0,0.9)"
  }}
>
 ⭐ {movies[heroIndex].rating}
</h2>
        </div>
      )}

      <h1
        style={{
          textAlign:"center",
          fontSize:"42px",
          fontWeight:"900",
          letterSpacing:"2px",
          marginBottom:"25px",
          background:"linear-gradient(90deg,#ff9800,#ffca28,#fff176)",
          WebkitBackgroundClip:"text",
          WebkitTextFillColor:"transparent",
          textShadow:"0 0 18px rgba(255,180,0,0.9)"
        }}
      >
      🔥 Movies 🔥
      </h1>

     
      <form onSubmit={addMovie} noValidate style={formWrap}>
        <input name="movieName" placeholder="Movie Name" value={form.movieName} onChange={handleChange} style={modernInput} 
        onFocus={(e)=>{
          e.target.style.boxShadow="0 0 12px rgba(0,229,255,0.8)";
          }}
          onBlur={(e)=>{
          e.target.style.boxShadow="none";
          }}/>
        <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} 
        onFocus={(e)=>{
            e.target.style.boxShadow="0 0 12px rgba(0,229,255,0.8)";
          }}

          onBlur={(e)=>{
            e.target.style.boxShadow="none";
          }}

          style={modernInput}/>
        <input type="text" name="releaseYear" maxLength="4" placeholder="Year"
          value={form.releaseYear}
          onChange={(e)=>{
            const v=e.target.value;
            if(/^\d{0,4}$/.test(v)) setForm({...form,releaseYear:v});
          }} onFocus={(e)=>{
            e.target.style.boxShadow="0 0 12px rgba(0,229,255,0.8)";
          }}

          onBlur={(e)=>{
            e.target.style.boxShadow="none";
          }}

          style={modernInput}
        />
        <input type="number" step="0.1" min="1" max="10"
          name="rating" placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
           onFocus={(e)=>{
              e.target.style.boxShadow="0 0 12px rgba(0,229,255,0.8)";
            }}

            onBlur={(e)=>{
              e.target.style.boxShadow="none";
            }}

            style={modernInput}
                  />
        <button
          style={addBtn}
          onMouseEnter={(e)=>{
            e.currentTarget.style.transform="scale(1.05)";
            e.currentTarget.style.boxShadow="0 0 18px rgba(255,152,0,0.9)";
          }}
          onMouseLeave={(e)=>{
            e.currentTarget.style.transform="scale(1)";
            e.currentTarget.style.boxShadow="none";
          }}
        >
          {editingId ? "Update Movie" : "Add Movie"}
        </button>
      </form>

      {/*  MOVIE GLASS CARDS */}
      {loading ? (

        <div style={{
          display:"flex",
          gap:"20px",
          flexWrap:"wrap",
          justifyContent:"center"
        }}>
          {[1,2,3,4,5,6].map(i=>(
            <div
              key={i}
              style={{
                width:"220px",
                height:"160px",
                borderRadius:"18px",
                background:
                  "linear-gradient(90deg,#1e2a38 25%,#2e3f55 37%,#1e2a38 63%)",
                backgroundSize:"400% 100%",
                animation:"shimmer 1.4s infinite"
              }}
            />
          ))}
        </div>

      ) : movies.length===0 ? (
        <h2 style={{color:"white",textAlign:"center"}}>No movies found</h2>
      ) : (
        <div style={grid}>
          {movies.map(movie=>(
            <div
              key={movie._id}
              style={{
                ...glassCard,
                opacity: deletingId===movie._id ? 0 : 1,
                transform:
                  deletingId===movie._id
                    ? "scale(0.8)"
                    : "scale(1)"
              }}
              onMouseEnter={(e)=>{
                e.currentTarget.style.transform="scale(1.06)";
                e.currentTarget.style.boxShadow="0 35px 70px rgba(0,0,0,0.9)";
              }}
              onMouseLeave={(e)=>{
                e.currentTarget.style.transform="scale(1)";
                e.currentTarget.style.boxShadow="0 15px 30px rgba(0,0,0,0.6)";
              }}
            >
              <h3>{movie.movieName}</h3>
              <p>{movie.genre}</p>
              <p>{movie.releaseYear}</p>
              <h3
                style={{
                  color:
                    movie.rating <= 3
                      ? "#ff5252"
                      : movie.rating <= 7
                      ? "#ffca28"
                      : "#66bb6a"
                }}
              >
              ⭐ {movie.rating}
              </h3>

              <div style={{display:"flex",justifyContent:"space-between"}}>
                <button style={editBtn}
                  onClick={()=>{
                    setForm(movie);
                    setEditingId(movie._id);
                  }}>
                  Edit
                </button>
                <button style={deleteBtn}
                  onClick={()=>deleteMovie(movie._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

const pageStyle={
  minHeight:"100vh",
  padding:20,
  background:"linear-gradient(180deg,#02070d,#04111c,#01060b)",
  fontFamily:"sans-serif"
};

const header={
  position:"sticky",
  top:0,
  backdropFilter:"blur(20px)",
  background:"rgba(0,0,0,0.4)",
  padding:15,
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  borderRadius:14,
  marginBottom:30,
  zIndex:100
};


const heroCard={
  height:"260px",
  borderRadius:"22px",
  padding:"40px",
  marginBottom:"40px",
  background:
    "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 100%), linear-gradient(120deg,#0f2027,#203a43,#2c5364)",
  color:"white",
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  boxShadow:"0 40px 80px rgba(0,0,0,0.9)",
  transition:"0.6s"
};

const formWrap={
  display:"flex",
  flexWrap:"wrap",
  gap:10,
  justifyContent:"center",
  marginBottom:30
};

const modernInput={
  padding:12,
  borderRadius:30,
  border:"1px solid rgba(255,255,255,0.2)",
  background:"rgba(255,255,255,0.05)",
  color:"white",
  boxShadow:"0 0 0 rgba(0,0,0,0)",
  transition:"0.3s"
};

const glassCard={
  width:220,
  padding:20,
  borderRadius:18,
  background:"rgba(255,255,255,0.06)",
  backdropFilter:"blur(18px)",
  boxShadow:"0 15px 30px rgba(0,0,0,0.6)",
  color:"white",
  transition:"all 0.35s ease",
  cursor:"pointer"
};

const grid={
  display:"flex",
  flexWrap:"wrap",
  gap:20,
  justifyContent:"center"
};

const addBtn={background:"#ff9800",border:"none",padding:"10px 20px",borderRadius:20,transition:"0.25s"};
const editBtn={background:"#2196f3",border:"none",padding:"6px 12px",borderRadius:8,color:"white"};
const deleteBtn={background:"#e50914",border:"none",padding:"6px 12px",borderRadius:8,color:"white"};

const toast={
  position:"fixed",
  top:20,
  right:20,
  background:"#ff5252",
  padding:"12px 20px",
  color:"white",
  borderRadius:8,
  zIndex:999
};

const searchInput={padding:8,borderRadius:20,border:"none"};
const searchBtn={padding:"8px 16px",borderRadius:20,border:"none"};
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes shimmer {
  0% { background-position: 100% 0 }
  100% { background-position: -100% 0 }
}
`, styleSheet.cssRules.length);

export default App;