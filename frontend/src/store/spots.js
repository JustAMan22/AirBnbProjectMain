import { csrfFetch } from "../store/csrf";

const LOAD_INFO = "LOAD_INFO";
const LOAD_SPOT = "LOAD_SPOT";
const CREATE_SPOT = "CREATE_SPOT";
const LOAD_USER_SPOT = "LOAD_USER_SPOT";
const UPDATE_SPOT = "UPDATE_SPOT";
const CREATE_IMAGE = "CREATE_IMAGE";
const DELETE_SPOT = "DELETE_SPOT";

const loadInfo = (spots) => {
  return {
    type: LOAD_INFO,
    spots,
  };
};

const loadSpot = (spot) => {
  return {
    type: LOAD_SPOT,
    spot,
  };
};

const createSpot = (spotDetails) => {
  return {
    type: CREATE_SPOT,
    spotDetails,
  };
};

const createImage = (image) => {
  return {
    type: CREATE_IMAGE,
    image,
  };
};

const loadUserSpot = (userSpot) => {
  return {
    type: LOAD_USER_SPOT,
    userSpot,
  };
};

const updateSpot = (updatedSpot) => {
  return {
    type: UPDATE_SPOT,
    updatedSpot,
  };
};

const deleteTheSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

export const postCreateSpot = (spotData) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spotData),
  });

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createSpot(newSpot));
    return newSpot;
  }
};

export const postCreateSpotImage = (imageData, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api//spots/${spotId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(imageData),
  });

  if (res.ok) {
    const newImage = await res.json();
    dispatch(createImage(imageData));
    return newImage;
  }
};

export const fetchSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots");

  if (res.ok) {
    const spots = await res.json();
    dispatch(loadInfo(spots));
    return res;
  }
};

export const fetchSpot = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(loadSpot(spot));
    return res;
  }
};

export const fetchUserSpot = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/spots`);

  if (res.ok) {
    const userSpot = await res.json();
    dispatch(loadUserSpot(userSpot));
    return res;
  }
};

export const updateSpotFetch = (updateData, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });

  if (res.ok) {
    const updatedSpot = res.json();
    dispatch(updateSpot(updatedSpot));
    return updatedSpot;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return "Spot couldn't be removed";
  }
  dispatch(deleteTheSpot(spotId));
};

const initialState = {};

const spotReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_INFO:
      newState = {};
      action.spots.Spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    case LOAD_SPOT:
      newState = {};
      const something = action.spot;
      newState[something.id] = something;
      return newState;
    case LOAD_USER_SPOT:
      newState = {};
      action.userSpot.Spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    case UPDATE_SPOT:
      newState[action.updatedSpot.id] = action.updatedSpot;
      return newState;
    case CREATE_IMAGE:
      newState[action.image.id] = action.image;
      return newState;
    case DELETE_SPOT:
      delete newState[action.spotId];
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
