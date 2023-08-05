import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../store/reviews";
import { fetchSpot } from "../../store/spots";
import { createReviewPost, deleteReviewFetch } from "../../store/reviews";
import ReviewModal from "../Modal/reviewmodal";

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
  console.log(images);

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
        <button onClick={handleReviewClick}>Post a review</button>
      </div>
    );
  }

  return (
    <div className="singular_spot">
      <h1>{spot?.name}</h1>
      <h3>{spot?.city}</h3>
      <h3>{spot?.state}</h3>
      <h3>{spot?.country}</h3>
      <h2>
        Hosted By: {owner?.firstName} {owner?.lastName}
      </h2>
      <p>{spot?.description}</p>
      <p>
        ★{spot?.avgRating} ({spot?.numReviews})
      </p>
      <div className="images-get-spots">
        {images &&
          images?.map((image) => <img src={image} alt="Spot view"></img>)}
      </div>
      <div className="reviews-get-spots">
        {reviewGet &&
          reviewGet?.map((review) => (
            <div key={review?.id}>
              <p>{review?.review}</p>
              {review?.User?.id === sessionUser?.id && (
                <button onClick={() => handleDeleteReview(review?.id)}>
                  Delete
                </button>
              )}
            </div>
          ))}
      </div>
      <div className="callout-box">
        <p>{spot?.price}</p>
        <button onClick={handleReserveClick}>Reserve</button>
      </div>
      {reviewButton}
      {/* Delete Confirmation Modal */}
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
