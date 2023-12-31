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

  if (Object.keys(spots).length === 0) {
    return <div>Loading...</div>;
  }

  const equatesToThat = Object.values(spots);

  return (
    <div className="all-spots-home">
      <ul className="spots-list">
        {equatesToThat?.map((spot) => (
          <NavLink
            to={`/spots/${spot?.id}`}
            className="spots-navlink"
            title={spot?.name}
            key={spot?.id}
          >
            <li className="each-tile-spot">
              <img
                className="tile-preview-images-home"
                src={spot?.previewImage}
                alt="Preview of spot"
              />
              <div className="div-city-state-rating">
                <div>
                  <h2 className="city-state-rating-text">
                    {spot?.city}, {spot?.state + " "}
                  </h2>
                </div>
                <div>
                  {spot?.avgRating !== "0.00" ? (
                    <p>★ {spot?.avgRating}</p>
                  ) : (
                    <p>★ New</p>
                  )}
                </div>
              </div>
              <div className="price-night">
                <div>
                  <h3 className="home-price-text">${spot?.price}</h3>
                </div>
                <div className="night-text">night</div>
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
