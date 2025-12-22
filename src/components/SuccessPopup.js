import React from "react";
import "./HomePage.css"; // Reusing styles

const SuccessPopup = () => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-icon">✓</div>
        <h2 className="popup-title">ধন্যবাদ!</h2>
        <p className="popup-message">
          অপেক্ষা করুন, আপনার তথ্য প্রক্রিয়াকরণ হচ্ছে...
        </p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default SuccessPopup;
