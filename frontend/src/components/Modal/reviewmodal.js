import React, { useState, useRef, useEffect } from "react";
import "./reviewmodal.css";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [serverError, setServerError] = useState(null); // New state for server error handling
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      // Reset the state when modal is closed
      setStars(0);
      setReview("");
      setServerError(null);
    }
  }, [isOpen]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      stars: parseFloat(stars),
      review,
    };

    try {
      await onSubmit(reviewData);
      onClose();
    } catch (error) {
      setServerError("Failed to submit the review. Please try again later.");
    }
  };

  const isSubmitDisabled = stars === 0 || review.length < 10;

  if (!isOpen) return null;

  return (
    <div className="review-modal">
      <div className="review-modal-content" ref={modalRef}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>How was your stay?</h2>
        {serverError && <p className="error-message">{serverError}</p>}
        <div className="rating">
          <span>Stars:</span>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= stars ? "filled" : ""}`}
                onClick={() => setStars(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <textarea
          className="review-text"
          value={review}
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
        />
        <button
          className={`submit-button ${isSubmitDisabled ? "disabled" : ""}`}
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Submit Your Review
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
