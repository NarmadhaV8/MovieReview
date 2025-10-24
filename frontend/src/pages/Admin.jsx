import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMovies } from "../redux/movieSlice"; // import your slice

function Admin({ user }) {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [movies, setLocalMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user]);

  // Load movies from localStorage
  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setLocalMovies(storedMovies);
    dispatch(setMovies(storedMovies)); // sync with Redux
  }, [dispatch]);

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!title || !img) {
      alert("Please fill all fields!");
      return;
    }

    const newMovie = {
      id: Date.now(),
      title,
      img,
    };

    const updatedMovies = [...movies, newMovie];
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
    setLocalMovies(updatedMovies);
    dispatch(setMovies(updatedMovies)); // update Redux for Home

    alert("Movie added successfully!");
    setTitle("");
    setImg("");
  };

  const handleDeleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setLocalMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
    dispatch(setMovies(updatedMovies)); // update Redux for Home

    alert("Movie deleted successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="p-5 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Add Movie</h2>

      <button
        onClick={handleLogout}
        className="mb-5 px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition"
      >
        Logout
      </button>

      <form onSubmit={handleAddMovie} className="mb-6 flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none flex-1"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none flex-1"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add Movie
        </button>
      </form>

      <h3 className="mt-8 text-lg font-semibold">🎬 Movies in Database</h3>
      <ul className="mt-4 space-y-3">
        {movies.map((movie) => (
          <li key={movie.id} className="flex items-center gap-3">
            <img
              src={movie.img}
              alt={movie.title}
              width="80"
              height="80"
              className="rounded-md border object-cover"
            />
            <span className="font-medium flex-1">{movie.title}</span>
            <button
              onClick={() => handleDeleteMovie(movie.id)}
              className="px-3 py-1 bg-red-700 text-white rounded-md hover:bg-red-800 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
