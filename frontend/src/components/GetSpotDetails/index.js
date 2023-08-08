import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../store/reviews";
import { fetchSpot } from "../../store/spots";
import { createReviewPost, deleteReviewFetch } from "../../store/reviews";
import ReviewModal from "../Modal/reviewmodal";
import "./GetSpotDetails.css";

function GetSpotDetailsFunc() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const sessionUser = useSelector((state) => state.session.user);

  const spot = useSelector((state) => state.spot[spotId]);
  const reviewGet = useSelector((state) =>
    Object.values(state.review).map((review) =>
      review.spotId === parseInt(spotId) ? review : null
    )
  );

  useEffect(() => {
    dispatch(fetchSpot(spotId));
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  const owner = spot?.Owner;
  const images = spot?.SpotImages;

  const handleReserveClick = () => {
    alert("Feature coming soon");
  };

  const handleReviewClick = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handleSubmitReview = async (reviewData) => {
    await dispatch(createReviewPost(reviewData, spotId));
    await dispatch(fetchSpot(spotId));
    window.location.reload();
  };

  const handleDeleteReview = (reviewId) => {
    setSelectedReviewId(reviewId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedReviewId) {
      await dispatch(deleteReviewFetch(selectedReviewId));
      await dispatch(fetchSpot(spotId));
      setSelectedReviewId(null);
      setIsDeleteModalOpen(false);
      window.location.reload();
    }
  };

  const handleCancelDelete = () => {
    setSelectedReviewId(null);
    setIsDeleteModalOpen(false);
  };

  const haveReview =
    sessionUser &&
    reviewGet.some((review) => review?.User?.id === sessionUser?.id);

  let reviewButton;
  if (sessionUser && sessionUser?.id !== spot?.ownerId && !haveReview) {
    reviewButton = (
      <div>
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={handleCloseReviewModal}
          onSubmit={handleSubmitReview}
        />
        <button onClick={handleReviewClick} className="post-review-btn">
          Post a review
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };
  const reviewCount = spot?.numReviews;
  const reviewText =
    reviewCount === 1 ? `${reviewCount} Review` : `${reviewCount} Reviews`;
  const hasReviews = reviewCount > 0;

  reviewGet.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));

  const haveReviews = reviewGet.length > 0;

  return (
    <div className="singular_spot">
      <h1>{spot?.name}</h1>
      <h3>
        {spot?.city}, {spot?.state}, {spot?.country}
      </h3>
      <div className="images-get-spots">
        {images &&
          images?.map((image, index) => (
            <img
              src={image.url}
              alt="Spot view"
              key={image.id}
              className={`spot-image spot-image-${index + 1}`}
            ></img>
          ))}
      </div>
      <div className="callout-host-price-container">
        <div className="just-price-host">
          <h2 className="hosted-by">
            Hosted By: {owner?.firstName} {owner?.lastName}
          </h2>
          <p>{spot?.description}</p>
        </div>
        <div className="callout-box">
          <div>
            <p className="price-text-callout">
              ${spot?.price} <span className="text-night">night</span>
            </p>
          </div>
          <div>
            {hasReviews ? (
              <p className="rating-text-callout">
                ★{spot?.avgRating} · {reviewText}
              </p>
            ) : (
              <p className="rating-text-callout">★{spot?.avgRating} New</p>
            )}
          </div>
          <button onClick={handleReserveClick} className="btn-reserve-callout">
            Reserve
          </button>
        </div>
      </div>
      <div className="review-info-container">
        {hasReviews && (
          <p>
            ★{spot?.avgRating} · {reviewText}
          </p>
        )}
        {!hasReviews && reviewButton && (
          <p className="rating-under-desc-text">★{spot?.avgRating} New</p>
        )}
        {reviewButton}
      </div>
      <div className="reviews-get-spots">
        {haveReviews ? (
          reviewGet.map((review) => (
            <div key={review?.id}>
              <h2 className="review-first-names">{review?.User?.firstName}</h2>
              <h3 className="date">{formatDate(review?.createdAt)}</h3>
              <p className="review-text-p">{review?.review}</p>
              {review?.User?.id === sessionUser?.id && (
                <button onClick={() => handleDeleteReview(review?.id)}>
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <>
            {sessionUser &&
              sessionUser?.id !== spot?.ownerId &&
              !reviewGet?.length && <p>Be the first to post a review!</p>}
          </>
        )}
      </div>
      {isDeleteModalOpen && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <div className="confirmation-modal-buttons">
              <button className="delete-button" onClick={handleConfirmDelete}>
                Yes (Delete Review)
              </button>
              <button className="cancel-button" onClick={handleCancelDelete}>
                No (Keep Review)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetSpotDetailsFunc;
