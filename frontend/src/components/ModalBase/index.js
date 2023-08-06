import React, { useState, useEffect } from "react";
import "./Modal.css";

function OpenModalMenu({ modalComponent, itemText }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const closeModalOnOutsideClick = (e) => {
      if (isModalOpen && !e.target.closest(".modal-content")) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", closeModalOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", closeModalOnOutsideClick);
    };
  }, [isModalOpen]);

  const onClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="modal-container">
      <button onClick={onClick} className="modal-button">
        {itemText}
      </button>
      {isModalOpen && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header"></div>
            <div className="modal-body">{modalComponent}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpenModalMenu;
