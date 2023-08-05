import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "LOAD_REVIEWS";
const CREATE_REVIEW = "CREATE_REVIEW";
const DELETE_REVIEW = "DELETE_REVIEW";

const loadReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews,
  };
};

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

export const fetchReviews = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadReviews(reviews.Reviews));
    console.log(res, "hello");
    return res;
  }
};

export const createReviewPost = (review, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(createReview(newReview));
    return newReview;
  }
};

export const deleteReviewFetch = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return "Review coudn't be removed";
  }
  dispatch(deleteReview(reviewId));
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_REVIEWS:
      newState = {};
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case CREATE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
