import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navigation-container">
      <div className="logo-container">
        <NavLink exact to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
            alt="home-logo"
            className="home-logo"
          />
        </NavLink>
      </div>
      {isLoaded && sessionUser ? (
        <div className="buttons-container">
          <NavLink to="/spots" className="create-spot-button">
            <div className="create-spot-button-container">
              <button className="create-btn-actl">Create Spot</button>
            </div>
          </NavLink>
          <ProfileButton user={sessionUser} />
        </div>
      ) : (
        <ProfileButton user={sessionUser} />
      )}
    </div>
  );
}

export default Navigation;
