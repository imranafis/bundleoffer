import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DepositPage.css";

const DepositPage = () => {
  const navigate = useNavigate();
  const [trxId, setTrxId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  // Temporary data for testing - replace with actual state/props
  const walletNo = "01712345678";
  const playerId = "TEST_USER_123";
  const selectedOffer = { deposit: "৫০০", bonus: "২৭৫০" };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trxId.trim()) {
      alert("দয়া করে সেন্ড মানি ট্রান্সাকশন আইডি দিন");
      return;
    }

    // Mock data saving
    console.log("Saving data:", {
      playerID: playerId,
      Bundle: `${selectedOffer.deposit} ডিপোজিট - ${selectedOffer.bonus} বোনাস`,
      TrxID: trxId,
    });

    setShowPopup(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="deposit-container">
      <div className="deposit-header">
        <h1>Mega Bundle Deposit</h1>
        <div className="selected-offer-display">
          <span className="offer-label">আপনার নির্বাচিত অফার:</span>
          <span className="offer-value">
            {selectedOffer.deposit} ডিপোজিট ={" "}
            <span className="golden">{selectedOffer.bonus}</span> বোনাস
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="deposit-form">
        <div className="wallet-section">
          <label className="wallet-label">Wallet No:</label>
          <div className="wallet-box">
            <span className="wallet-number">{walletNo}</span>
            <button
              type="button"
              className="copy-btn"
              onClick={copyToClipboard}
            >
              {copied ? "কপিড!" : "কপি করুন"}
            </button>
          </div>
        </div>

        <div className="trx-section">
          <label className="trx-label">
            সেন্ড মানির নাম্বারটি অথবা সেন্ড মানি একাউন্টের নাম্বারটি লিখুন
            <span className="required"> (প্রয়োজন)</span>
          </label>
          <input
            type="text"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            placeholder="সেন্ড মানি ট্রান্সাকশন আইডি লিখুন"
            className="trx-input"
            required
          />
        </div>

        <button type="submit" className="confirm-btn">
          নিশ্চিত
        </button>
      </form>

      <div className="casino-elements">
        <div className="chip chip-1"></div>
        <div className="chip chip-2"></div>
        <div className="card card-1"></div>
        <div className="card card-2"></div>
      </div>

      {showPopup && (
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
      )}
    </div>
  );
};

export default DepositPage;
