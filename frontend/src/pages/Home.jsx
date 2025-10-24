import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "../components/MovieCard";
import { Moon, Sun } from "lucide-react";
import { setMovies, selectMoviesList } from "../redux/movieSlice";
import { toggleTheme } from "../redux/themeSlice";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moviesListState = useSelector(selectMoviesList);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [celebrities, setCelebrities] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  // ✅ Fetch movies and calculate top-rated
  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const moviesRes = await axios.get("http://localhost:5000/api/movies");
        const movies = moviesRes.data;

        const ratedMovies = await Promise.all(
          movies.map(async (movie) => {
            const reviewsRes = await axios.get(
              `http://localhost:5000/api/reviews/${movie._id}`
            );
            const reviews = reviewsRes.data;
            const avgRating =
              reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                : 0;
            return { ...movie, avgRating };
          })
        );

        // Sort movies descending by avgRating
        ratedMovies.sort((a, b) => b.avgRating - a.avgRating);

        // Save top 5 for Top Rated section
        setTopRatedMovies(ratedMovies.slice(0, 5));

        // Update Redux store with all movies
        dispatch(setMovies(ratedMovies));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchTopRated();
  }, [dispatch]);


  // ✅ Handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => navigate("/login");
  const handleProfile = () => navigate("/profile");

  const handleImgError = (e) => {
    e.target.src = "/placeholder.png";
  };

  // ✅ Search / Filter movies
  const filteredMovies = Array.isArray(moviesListState)
    ? moviesListState.filter((movie) =>
        (movie.title || movie.name || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : [];

  // ✅ New Releases (latest 3 movies)
  const newReleases = Array.isArray(moviesListState)
    ? [...moviesListState]
        .sort((a, b) => (b._id ?? 0) - (a._id ?? 0))
        .slice(0, 3)
    : [];

  return (
    <div className="home-page min-h-screen p-6">
      {/* Navbar */}
      <nav className="bg-[#7ecbfa] dark:bg-[#1e3a8a] shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center gap-6 font-semibold text-lg text-blue-900 dark:text-blue-100">
          <button onClick={() => navigate("/home")} className="hover:underline">
            Home
          </button>
          <button onClick={handleProfile} className="hover:underline">
            Profile
          </button>
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 p-2 rounded-full bg-[#bfdbfe] text-blue-900 placeholder-blue-700 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#1e3a8a] dark:text-blue-100 dark:border-blue-700 dark:placeholder-blue-300"
          />
        </div>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="ml-4 p-2 rounded-full bg-blue-500 text-white dark:bg-blue-700 shadow hover:scale-110 transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-300" />
          ) : (
            <Moon className="w-5 h-5 text-white" />
          )}
        </button>
      </nav>

      {/* Welcome */}
      <h1 className="text-center py-6 text-3xl font-bold text-blue-900 dark:text-blue-100">
        Welcome, {user?.name || user?.email || "Guest"}
      </h1>

      {/* Top Rated Movies */}
      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900 dark:text-blue-100 text-center">
          🌟 Top Rated Movies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topRatedMovies.length > 0 ? (
            topRatedMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))
          ) : (
            <p className="col-span-full text-center text-blue-700 dark:text-blue-300">
              No top rated movies yet.
            </p>
          )}
        </div>
      </div>

      {/* New Releases */}
      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900 dark:text-blue-100 text-center">
          🎬 New Releases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {newReleases.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>

      {/* Movies Section */}
      <div className="max-w-8xl mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100 text-center">
          🎥 Movies Section
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))
          ) : (
            <p className="col-span-full text-center text-blue-700 dark:text-blue-300">
              No movies found.
            </p>
          )}
        </div>
      </div>

      
      
    </div>
  );
}

export default Home;
