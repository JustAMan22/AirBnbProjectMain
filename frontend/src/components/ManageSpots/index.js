import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { fetchReviews } from "../../store/reviews";
import { fetchSpot, fetchUserSpot } from "../../store/spots";
import { createReviewPost } from "../../store/reviews";
import ReviewModal from "../Modal/reviewmodal";
import DeleteSpot from "../DeleteSpot";
import "./ManageSpots.css";

function ManageSpots() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser?.id;

  const spots = useSelector((state) => state.spot);

  useEffect(() => {
    dispatch(fetchUserSpot(userId));
  }, [dispatch]);

  const equatesToThat = Object.values(spots);
  console.log(equatesToThat);

  let createButton;
  if (equatesToThat.length === 0) {
    createButton = (
      <NavLink to="/spots" className="create-spot-link">
        <button className="create-spot-button">Create Spot</button>
      </NavLink>
    );
  }

  return (
    <div className="all-spots-home">
      <ul className="spots-list">
        <div className="create-btn-manage-spots-h1">
          <h1 className="manage-spots-h1">Manage Spots</h1>
          {createButton}
        </div>
        {equatesToThat?.map((spot) => (
          <NavLink
            to={`/spots/${spot?.id}`}
            className="spots-navlink"
            title={spot?.name}
          >
            <li className="each-tile-spot" key={spot?.id}>
              <img
                className="tile-preview-images-home"
                src={spot?.previewImage}
                alt="Preview of spot"
              ></img>
              <div className="div-city-state-rating">
                <div>
                  <h2 className="city-state-rating-text">
                    {spot?.city}, {spot?.state + " "}
                  </h2>
                </div>
                <div>
                  {spot?.avgRating
                    ? "★" + " " + spot?.avgRating.toFixed(2)
                    : "New"}
                </div>
              </div>
              <div className="price-night">
                <div>
                  <h3 className="home-price-text">${spot?.price}</h3>
                </div>
                <div className="night-text">night</div>
              </div>
              <div className="delete-update-buttons">
                <NavLink
                  to={`/spots/${spot?.id}/update`}
                  className="update-link"
                >
                  <button className="update-button">Update</button>
                </NavLink>
                <DeleteSpot spotId={spot?.id} />
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default ManageSpots;
