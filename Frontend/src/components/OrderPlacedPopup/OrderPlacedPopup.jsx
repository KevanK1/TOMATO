import React from 'react';
import './OrderPlacedPopup.css'; // Add styles for the popup

const OrderPlacedPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Order Placed Successfully!</h2>
        <p>Your order has been placed successfully. Thank you for shopping with us!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderPlacedPopup;
