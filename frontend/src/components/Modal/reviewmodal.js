import React, { useState } from "react";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      stars: parseFloat(stars), // Parse the stars as a float
      review,
    };
    onSubmit(reviewData);
    onClose();
  };

  return (
    <div className="review-modal">
      <div className="review-modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Leave a Review</h2>
        <div className="rating">
          <span>Rating:</span>
          <input
            type="number" // Change input type to 'number'
            min="1"
            max="5"
            step="0.1"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
          />
        </div>
        <textarea
          className="review-text"
          value={review}
          placeholder="Write your review here..."
          onChange={(e) => setReview(e.target.value)}
        />
        <button className="submit-button" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
