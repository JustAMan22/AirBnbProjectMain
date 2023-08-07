import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import "./DeleteSpot.css";

function DeleteSpot({ spotId }) {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteSpot(spotId));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting spot:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="delete-spot-container">
      <button
        onClick={handleDeleteButtonClick}
        className="delete-btn-delete-spot"
      >
        Delete
      </button>

      {isDeleteModalOpen && (
        <div className="delete-spot-modal">
          <div className="delete-modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot?</p>
            <div className="button-column">
              <button onClick={handleConfirmDelete} className="red-button">
                Yes (Delete Spot)
              </button>
              <button onClick={handleCancelDelete} className="dark-grey-button">
                No (Keep Spot)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteSpot;
