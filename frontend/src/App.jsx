import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./redux/themeSlice.js";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Admin from "./pages/Admin.jsx";
import CelebrityDetails from "./pages/CelebrityDetails.jsx";

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [user, setUser] = useState(null);

  // Save user to localStorage
  useEffect(() => {
    if (user) localStorage.setItem("currentUser", JSON.stringify(user));
    else localStorage.removeItem("currentUser");
  }, [user]);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser && !user) setUser(savedUser);
  }, [user]);

  // Apply saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" && !darkMode) dispatch(toggleTheme());
  }, [dispatch, darkMode]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-blue-900 dark:text-blue-100 transition-colors">
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />

        {/* Home */}
        <Route
          path="/home"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />

        {/* Login / Signup */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={user?.role === "admin" ? <Admin user={user} /> : <Navigate to="/login" />}
        />

        {/* Celebrity details */}
        <Route path="/celebrity/:id" element={<CelebrityDetails />} />

        
      </Routes>
    </div>
  );
}

export default App;
