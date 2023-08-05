import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postCreateSpot, postCreateSpotImage } from "../../store/spots";

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

  useEffect(() => {
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
    if (!images[0].match(/\.(png|jpe?g)$/)) {
      validationErrors["image_0"] =
        "Image URL must end in .png, .jpg, or .jpeg";
    }
    setErrors(validationErrors);
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
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any validation errors
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
      <h1>Create a new spot</h1>
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
        <h2>Liven up your spot with photos</h2>
        <h3>Submit a link to at least one photo to publish your spot.</h3>
        <label>
          <input
            type="text"
            value={previewImage}
            placeholder="Preview Image URL"
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </label>
        {errors.previewImage && <p>{errors.previewImage}</p>}
        {images.map((url, index) => (
          <label key={index}>
            <input
              type="text"
              value={url}
              placeholder="Image URL"
              onChange={(e) => {
                const newImages = [...images];
                newImages[index] = e.target.value;
                setImages(newImages);
              }}
            />
          </label>
        ))}
        {errors.images && <p>{errors.images}</p>}
        <br />
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}

export default CreateSpot;
