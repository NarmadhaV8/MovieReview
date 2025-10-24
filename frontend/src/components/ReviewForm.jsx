import React, { useState } from "react";

export default function MovieCard({ movie, reviews, addReview }) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText || rating === 0) return;
    addReview(movie.id, reviewText, rating);
    setReviewText("");
    setRating(0);
  };

  return (
    <div style={styles.card}>
      <img src={movie.img} alt={movie.title} style={styles.image} />
      <h3 style={styles.title}>{movie.title}</h3>

      {/* Star Rating */}
      <div style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{
              cursor: "pointer",
              color: star <= rating ? "#FFD700" : "#ccc",
              fontSize: "20px",
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Write a review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Review</button>
      </form>

      {/* Reviews List */}
      <div style={styles.reviewList}>
        {reviews && reviews.map((r, i) => (
          <div key={i} style={styles.reviewItem}>
            <p><strong>{r.user}:</strong> {r.text}</p>
            <p>Rating: {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    width: "100%",
    maxWidth: "250px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  title: {
    marginBottom: "10px",
    fontSize: "1.2rem",
  },
  stars: {
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginBottom: "10px",
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "8px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2c3e50",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  reviewList: {
    textAlign: "left",
    marginTop: "10px",
    borderTop: "1px solid #ddd",
    paddingTop: "10px",
  },
  reviewItem: {
    marginBottom: "8px",
  },
};
