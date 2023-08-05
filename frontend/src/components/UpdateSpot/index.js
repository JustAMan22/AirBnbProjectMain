import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSpots } from "../../store/spots";
import { updateSpotFetch } from "../../store/spots";

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
      console.error("Error creating spot:", error);
      if (error instanceof Response) {
        const responseJson = await error.json();
        console.error("Server response:", responseJson);
      }
    }
  };

  return (
    <div className="create-spot-container">
      <h1>Update your spot</h1>
      <h2>Where's your place located?</h2>
      <h3>
        Guests will only get your exact address once they booked a reservation
      </h3>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Country
          <input
            type="text"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        {errors.country && <p>{errors.country}</p>}
        <br />
        <label>
          Street Address
          <input
            type="text"
            value={address}
            placeholder="Street Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        {errors.address && <p>{errors.address}</p>}
        <br />
        <label>
          City
          <input
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        {errors.city && <p>{errors.city}</p>}
        <br />
        <label>
          State
          <input
            type="text"
            value={state}
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        {errors.state && <p>{errors.state}</p>}
        <br />
        <label>
          Latitude
          <input
            type="decimal"
            value={lat}
            placeholder="Latitude"
            onChange={(e) => setLat(e.target.value)}
          />
        </label>
        {errors.latitude && <p>{errors.latitude}</p>}
        <br />
        <label>
          Longitude
          <input
            type="decimal"
            value={lng}
            placeholder="Longitude"
            onChange={(e) => setLng(e.target.value)}
          />
        </label>
        {errors.longitude && <p>{errors.longitude}</p>}
        <h2>Describe your place to guests</h2>
        <h3>
          Mention the best features of your space, any special amentities like
          fast wif or parking, and what you love about the neighborhood.
        </h3>
        <br />
        <label>
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {errors.description && <p>{errors.description}</p>}
        <h2>Create a title for your spot</h2>
        <h3>
          Catch guests' attention with a spot title that highlights what makes
          your place special
        </h3>
        <label>
          <input
            type="text"
            value={name}
            placeholder="Name of your spot"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <br />
        <h2>Set a base price for your spot</h2>
        <h3>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </h3>
        <label>
          <input
            type="decimal"
            value={price}
            placeholder="Price per night (USD)"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        {errors.price && <p>{errors.price}</p>}
        <br />
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}

export default UpdateSpot;
