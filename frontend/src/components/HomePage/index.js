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
      <ul className="spots-list">
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
                    : "★" + " " + "New"}
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
