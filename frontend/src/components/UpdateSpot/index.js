// UpdateSpot.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSpots } from "../../store/spots";
import { updateSpotFetch } from "../../store/spots";
import "./UpdateSpot.css";

function UpdateSpot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state?.spot[spotId]);
  const history = useHistory();
  const [country, setCountry] = useState(spots?.country);
  const [address, setAddress] = useState(spots?.address);
  const [city, setCity] = useState(spots?.city);
  const [state, setState] = useState(spots?.state);
  const [lat, setLat] = useState(spots?.lat);
  const [lng, setLng] = useState(spots?.lng);
  const [description, setDescription] = useState(spots?.description);
  const [name, setName] = useState(spots?.name);
  const [price, setPrice] = useState(spots?.price);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  useEffect(() => {
    const errors = {};
    if (!country?.length) errors.country = "Country is required";
    if (!address?.length) errors.address = "Address is required";
    if (!city?.length) errors.city = "City is required";
    if (!state?.length) errors.state = "State is required";
    if (!lat) errors.lat = "Latitude is required";
    if (!lng) errors.lng = "Longitude is required";
    if (description?.length < 30)
      errors.description = "Description needs a minimum of 30 characters";
    if (!name?.length) errors.name = "Name is required";
    if (!price) errors.price = "Price is required";
    setErrors(errors);
  }, [country, address, city, state, lat, lng, description, name, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      country,
      address,
      city,
      state,
      lat,
      lng,
      description,
      name,
      price,
    };
    try {
      const spot = await dispatch(updateSpotFetch(payload, spotId));
      if (spot) {
        history.push(`/spots/${spot.id}`);
      }
    } catch (error) {
      console.error("Error updating spot:", error);
      if (error instanceof Response) {
        const responseJson = await error.json();
        console.error("Server response:", responseJson);
      }
    }
  };

  return (
    <div className="update-spot-container">
      <h1 className="updateSpot-title">Update your spot</h1>
      <h2 className="updateSpot-subtitle">Where's your place located?</h2>
      <h3 className="updateSpot-desc">
        Guests will only get your exact address once they booked a reservation
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="updateSpot-label">
            Country
            <input
              type="text"
              value={country}
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              className="updateSpot-input"
            />
          </label>
          {errors.country && (
            <p className="updateSpot-error">{errors.country}</p>
          )}
        </div>
        <div className="form-row">
          <label className="updateSpot-label">
            Street Address
            <input
              type="text"
              value={address}
              placeholder="Street Address"
              onChange={(e) => setAddress(e.target.value)}
              className="updateSpot-input"
            />
          </label>
          {errors.address && (
            <p className="updateSpot-error">{errors.address}</p>
          )}
        </div>
        <div className="form-row">
          <label className="updateSpot-label">
            City
            <input
              type="text"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              className="updateSpot-input"
            />
          </label>
          {errors.city && <p className="updateSpot-error">{errors.city}</p>}
        </div>
        <div className="form-row">
          <label className="updateSpot-label">
            State
            <input
              type="text"
              value={state}
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
              className="updateSpot-input"
            />
          </label>
          {errors.state && <p className="updateSpot-error">{errors.state}</p>}
        </div>
        <div className="form-row">
          <label className="updateSpot-label">
            Latitude
            <input
              type="decimal"
              value={lat}
              placeholder="Latitude"
              onChange={(e) => setLat(e.target.value)}
              className="updateSpot-input"
            />
          </label>
          {errors.lat && <p className="updateSpot-error">{errors.lat}</p>}
        </div>
        <div className="form-row">
          <label className="updateSpot-label">
            Longitude
            <input
              type="decimal"
              value={lng}
              placeholder="Longitude"
              onChange={(e) => setLng(e.target.value)}
              className="updateSpot-input"
            />
          </label>
          {errors.lng && <p className="updateSpot-error">{errors.lng}</p>}
        </div>
        <h2 className="updateSpot-title">Describe your place to guests</h2>
        <h3 className="updateSpot-desc">
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.
        </h3>
        <label className="updateSpot-label">
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="updateSpot-input-description"
          />
        </label>
        {errors.description && (
          <p className="updateSpot-error">{errors.description}</p>
        )}
        <h2 className="updateSpot-title">Create a title for your spot</h2>
        <h3 className="updateSpot-desc">
          Catch guests' attention with a spot title that highlights what makes
          your place special.
        </h3>
        <label className="updateSpot-label">
          <input
            type="text"
            value={name}
            placeholder="Name of your spot"
            onChange={(e) => setName(e.target.value)}
            className="updateSpot-input"
          />
        </label>
        {errors.name && <p className="updateSpot-error">{errors.name}</p>}
        <h2 className="updateSpot-title">Set a base price for your spot</h2>
        <h3 className="updateSpot-desc">
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </h3>
        <label className="updateSpot-label">
          <input
            type="decimal"
            value={price}
            placeholder="Price per night (USD)"
            onChange={(e) => setPrice(e.target.value)}
            className="updateSpot-input"
          />
        </label>
        {errors.price && <p className="updateSpot-error">{errors.price}</p>}
        <button type="submit" className="updateSpot-submit-button">
          Update Spot
        </button>
      </form>
    </div>
  );
}

export default UpdateSpot;
