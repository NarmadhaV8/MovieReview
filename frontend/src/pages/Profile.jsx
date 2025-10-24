import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState(user?.password || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply theme to entire page
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((u) =>
      u.email === user.email ? { ...u, name, phone, password, profilePic } : u
    );
    localStorage.setItem("users", JSON.stringify(users));

    const updatedUser = { ...user, name, phone, password, profilePic };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("Profile updated!");
    setEditing(false);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
<div className="profile-page min-h-screen transition-colors duration-300">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-blue-600 dark:bg-blue-800 text-white px-6 py-4 shadow-md rounded-b-xl transition-colors duration-300">
        <button
          onClick={() => navigate("/home")}
          className="font-bold hover:text-blue-200 transition"
        >
          Home
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-blue-500 dark:bg-blue-700 hover:scale-110 transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-300" />
          ) : (
            <Moon className="w-5 h-5 text-white" />
          )}
        </button>
      </nav>

      {/* Profile Card */}
<div className="profile-card max-w-md mx-auto mt-10 transition-colors duration-300">
        <div className="flex flex-col items-center mb-6">
          <label className="cursor-pointer relative group">
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center mb-4 shadow-inner transition-all duration-300">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 dark:text-gray-300 font-medium">
                  Add Image
                </span>
              )}
            </div>
            {editing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            )}
            {editing && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full text-white font-semibold transition-opacity duration-300">
                Change
              </div>
            )}
          </label>
        </div>

        {!editing ? (
          <div className="space-y-4">
            <div className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm transition-colors duration-300">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Name:
              </span>
              <span className="text-gray-900 dark:text-gray-100">{name}</span>
            </div>
            <div className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm transition-colors duration-300">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Email:
              </span>
              <span className="text-gray-900 dark:text-gray-100">{user.email}</span>
            </div>
            <div className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm transition-colors duration-300">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Phone:
              </span>
              <span className="text-gray-900 dark:text-gray-100">{phone}</span>
            </div>
            <div className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm transition-colors duration-300">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Password:
              </span>
              <span className="text-gray-900 dark:text-gray-100">
                {"*".repeat(password.length)}
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300"
              required
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
            >
              Save Changes
            </button>
          </form>
        )}

        {/* Buttons below user details */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setEditing(!editing)}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
