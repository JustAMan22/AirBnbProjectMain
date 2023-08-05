import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { fetchReviews } from "../../store/reviews";
import { fetchSpot, fetchUserSpot } from "../../store/spots";
import { createReviewPost } from "../../store/reviews";
import ReviewModal from "../Modal/reviewmodal";
import DeleteSpot from "../DeleteSpot";
import "../ManageSpots/ManageSpots.css";

function ManageSpots() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const spots = useSelector((state) => state.spot);

  useEffect(() => {
    dispatch(fetchUserSpot(userId));
  }, [dispatch]);

  const equatesToThat = Object.values(spots);
  console.log(equatesToThat);

  let createButton;
  if (equatesToThat.length === 0) {
    createButton = (
      <NavLink to="/spots">
        <button>Create Spot</button>
      </NavLink>
    );
  }

  return (
    <div className="manage-spots-container">
      <h1>Manage Your Spots</h1>
      {createButton}
      {equatesToThat?.map((spot) => (
        <div>
          <NavLink to={`/spots/${spot?.id}`}>
            <div key={spot?.id}>
              <h3>{spot?.name}</h3>
              <h3>{spot?.city}</h3>
              <h3>{spot?.state}</h3>
              <img src={spot?.previewImage} alt="Preview of spot"></img>
              <h3>{spot?.price} night</h3>
              <h3>{spot?.avgRating ? "★" + spot.avgRating : "New"}</h3>
            </div>
          </NavLink>
          <div className="delete-update-buttons">
            <NavLink to={`/spots/${spot?.id}/update`}>
              <button>Update</button>
            </NavLink>{" "}
            <DeleteSpot spotId={spot?.id} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManageSpots;
