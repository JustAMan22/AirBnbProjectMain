// HomePage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchSpots } from "../../store/spots";
import "../HomePage/HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  console.log(spots);

  if (Object.keys(spots).length === 0) {
    return <div>Loading...</div>;
  }

  const equatesToThat = Object.values(spots);
  console.log(equatesToThat);

  return (
    <div className="all-spots-home">
      {equatesToThat?.map((spot) => (
        <NavLink to={`/spots/${spot?.id}`} className="active-link">
          <div className="each-tile-spot" key={spot?.id}>
            <div className="tile-preview-images-home-container">
              <img
                className="tile-preview-images-home"
                src={spot?.previewImage}
                alt="Preview of spot"
              ></img>
            </div>
            <div className="tile-details">
              <div className="container-home-city-state-rating">
                <h3 className="home-city-state">
                  <div className="star-rating">
                    {spot?.avgRating ? "★" + spot.avgRating : "New"}
                  </div>
                  {spot?.city}, {spot?.state}
                </h3>
                <h3 className="home-price">${spot?.price} night</h3>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default HomePage;
