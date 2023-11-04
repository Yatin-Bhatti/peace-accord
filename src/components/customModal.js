import React from 'react';
import './customModal.css';

const CustomModal = ({ onClose }) => {
  return (
    <div className="custom-modal-background">
      <div className="custom-modal">
        <div className="custom-modal-content">
          <h2>Alert</h2>
          <p>All the progress will be lost. Are you sure you want to refresh?</p>
        </div>
        <div className="custom-modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onClose}>Refresh</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
