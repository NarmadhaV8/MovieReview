import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview as addReviewAction } from "../redux/movieSlice";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.movies.reviews || {});
  const reviews = allReviews[movie._id] || [];

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [liked, setLiked] = useState(false);

 

  // ✅ Handle Review Submit (store in DB + show on frontend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText || rating === 0) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please login to add a review");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId: movie._id,
          user: currentUser.email,
          text: reviewText,
          rating,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert("Failed to save review: " + data.message);
        return;
      }

      // Update Redux store to show review immediately
      dispatch(
        addReviewAction({
          movieId: movie._id,
          review: { user: currentUser.email, text: reviewText, rating },
        })
      );

      setReviewText("");
      setRating(0);
    } catch (err) {
      console.error("Error saving review:", err);
      alert("❌ Could not save review. Check backend connection.");
    }
  };

  // ✅ Like / Unlike Movie
  const handleLike = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Login to like movies");
      return;
    }

    const allLikes = JSON.parse(localStorage.getItem("likedMovies")) || {};
    const userLikes = allLikes[currentUser.email] || [];

    if (liked) {
      allLikes[currentUser.email] = userLikes.filter((m) => m._id !== movie._id);
      setLiked(false);
    } else {
      allLikes[currentUser.email] = [...userLikes, movie];
      setLiked(true);
    }

    localStorage.setItem("likedMovies", JSON.stringify(allLikes));
  };

  // ⭐ Star Rating Component
  const Star = ({ starValue }) => (
    <span
      onClick={() => setRating(starValue)}
      onMouseEnter={() => setHoverRating(starValue)}
      onMouseLeave={() => setHoverRating(0)}
      className={`cursor-pointer text-xl mr-1 transition-colors ${
        starValue <= (hoverRating || rating)
          ? "text-yellow-400"
          : "text-gray-300 dark:text-gray-600"
      }`}
    >
      ★
    </span>
  );

  return (
    <div className="w-70 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
      {/* ✅ Corrected image field */}
      <img
        src={movie.image ? movie.image : "/placeholder.png"}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-lg mb-4 border-2 border-blue-300"
        onError={(e) => (e.target.src = "/placeholder.png")}
      />

      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
        {movie.title}
      </h3>

      

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
        <div className="flex justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} starValue={star} />
          ))}
        </div>
        <input
          type="text"
          placeholder="Write a review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-blue-400 text-black font-semibold hover:bg-blue-500 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 transition"
        >
          Add Review
        </button>
      </form>
 <div className="text-left mt-4 space-y-3">
    {reviews.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
    ) : (
      reviews.map((r, i) => (
        <div
          key={i}
          className="p-2 border-b border-gray-200 dark:border-gray-700 rounded"
        >
          <p className="font-semibold text-gray-900 dark:text-gray-100">{r.user}:</p>
          <p className="text-gray-700 dark:text-gray-300">{r.text}</p>
          <p className="text-yellow-400">
            {"★".repeat(r.rating)}
            {"☆".repeat(5 - r.rating)}
          </p>
        </div>
      ))
    )}
  </div>
    </div>
  );
}
