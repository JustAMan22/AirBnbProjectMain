import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postCreateSpot, postCreateSpotImage } from "../../store/spots";
import "./CreateSpot.css";

function CreateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [previewImage, setPreviewImage] = useState("");
  const [images, setImages] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const validationErrors = {};
      if (!country) validationErrors.country = "Country is required";
      if (!address) validationErrors.address = "Address is required";
      if (!city) validationErrors.city = "City is required";
      if (!state) validationErrors.state = "State is required";
      if (!lat) validationErrors.lat = "Latitude is required";
      if (!lng) validationErrors.lng = "Longitude is required";
      if (description.length < 30)
        validationErrors.description =
          "Description needs a minimum of 30 characters";
      if (!name) validationErrors.name = "Name is required";
      if (!price) validationErrors.price = "Price is required";
      if (!previewImage)
        validationErrors.previewImage = "Preview image is required.";
      if (!images[0].match(/\.(png|jpe?g)$/) || !images[0]) {
        validationErrors.images = "Image URL must end in .png, .jpg, or .jpeg";
      }
      setErrors(validationErrors);
    }
  }, [
    country,
    address,
    city,
    state,
    lat,
    lng,
    description,
    name,
    price,
    previewImage,
    images,
    submitted,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (Object.keys(errors).length > 0) {
      console.error("Validation errors:", errors);
      return;
    }

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
      const spot = await dispatch(postCreateSpot(payload));
      if (spot) {
        const spotId = spot.id;
        await dispatch(
          postCreateSpotImage({ preview: true, url: previewImage }, spotId)
        );
        images.forEach(async (url) => {
          if (url) {
            await dispatch(
              postCreateSpotImage({ preview: false, url: url }, spotId)
            );
          }
        });
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
      <h1 className="createSpot-title">Create a new spot</h1>
      <h2 className="createSpot-subtitle">Where's your place located?</h2>
      <h3 className="createSpot-desc">
        Guests will only get your exact address once they booked a reservation
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {submitted && errors.country && (
            <p className="createSpot-error">{errors.country}</p>
          )}
          <label className="createSpot-label">
            Country
            <input
              type="text"
              value={country}
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              className="createSpot-input"
            />
          </label>
        </div>
        <div className="form-row">
          {submitted && errors.address && (
            <p className="createSpot-error">{errors.address}</p>
          )}
          <label className="createSpot-label">
            Street Address
            <input
              type="text"
              value={address}
              placeholder="Street Address"
              onChange={(e) => setAddress(e.target.value)}
              className="createSpot-input"
            />
          </label>
        </div>
        <div className="form-row">
          <div className="form-column">
            {submitted && errors.city && (
              <p className="createSpot-error">{errors.city}</p>
            )}
            <label className="createSpot-label">
              City
              <input
                type="text"
                value={city}
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                className="createSpot-input"
              />
            </label>
          </div>
          <div className="form-column">
            {submitted && errors.state && (
              <p className="createSpot-error">{errors.state}</p>
            )}
            <label className="createSpot-label">
              State
              <input
                type="text"
                value={state}
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
                className="createSpot-input"
              />
            </label>
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
            {submitted && errors.lat && (
              <p className="createSpot-error">{errors.lat}</p>
            )}
            <label className="createSpot-label">
              Latitude
              <input
                type="decimal"
                value={lat}
                placeholder="Latitude"
                onChange={(e) => setLat(e.target.value)}
                className="createSpot-input"
              />
            </label>
          </div>
          <div className="form-column">
            {submitted && errors.lng && (
              <p className="createSpot-error">{errors.lng}</p>
            )}
            <label className="createSpot-label">
              Longitude
              <input
                type="decimal"
                value={lng}
                placeholder="Longitude"
                onChange={(e) => setLng(e.target.value)}
                className="createSpot-input"
              />
            </label>
          </div>
        </div>

        <h2 className="createSpot-subtitle">Describe your place to guests</h2>
        <h3 className="createSpot-desc">
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.
        </h3>
        <div className="form-row">
          {submitted && errors.description && (
            <p className="createSpot-error">{errors.description}</p>
          )}
          <label className="createSpot-label">
            <input
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              className="createSpot-input-description"
            />
          </label>
        </div>
        <h2 className="createSpot-subtitle">Create a title for your spot</h2>
        <h3 className="createSpot-desc">
          Catch guests' attention with a spot title that highlights what makes
          your place special
        </h3>
        <div className="form-row">
          {submitted && errors.name && (
            <p className="createSpot-error">{errors.name}</p>
          )}
          <label className="createSpot-label">
            <input
              type="text"
              value={name}
              placeholder="Name of your spot"
              onChange={(e) => setName(e.target.value)}
              className="createSpot-input"
            />
          </label>
        </div>
        <h2 className="createSpot-subtitle">Set a base price for your spot</h2>
        <h3 className="createSpot-desc">
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </h3>
        <div className="form-row">
          {submitted && errors.price && (
            <p className="createSpot-error">{errors.price}</p>
          )}
          <label className="createSpot-label">
            <input
              type="decimal"
              value={price}
              placeholder="Price per night (USD)"
              onChange={(e) => setPrice(e.target.value)}
              className="createSpot-input"
            />
          </label>
        </div>
        <h2 className="createSpot-subtitle">Liven up your spot with photos</h2>
        <h3 className="createSpot-desc">
          Submit a link to at least one photo to publish your spot.
        </h3>
        <div className="form-row">
          {submitted && errors.previewImage && (
            <p className="createSpot-error">{errors.previewImage}</p>
          )}
          <label className="createSpot-label">
            <input
              type="text"
              value={previewImage}
              placeholder="Preview Image URL"
              onChange={(e) => setPreviewImage(e.target.value)}
              className="createSpot-input"
            />
          </label>
        </div>
        {images.map((url, index) => (
          <div key={index} className="form-row">
            {submitted && index === 0 && errors.images && (
              <p className="createSpot-error">{errors.images}</p>
            )}
            <label className="createSpot-label">
              <input
                type="text"
                value={url}
                placeholder="Image URL"
                onChange={(e) => {
                  const newImages = [...images];
                  newImages[index] = e.target.value;
                  setImages(newImages);
                }}
                className="createSpot-input"
              />
            </label>
          </div>
        ))}
        <br />
        <button type="submit" className="createSpot-submit-button">
          Create Spot
        </button>
        {Object.keys(errors).length > 0}
      </form>
    </div>
  );
}

export default CreateSpot;
