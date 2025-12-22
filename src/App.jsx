import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [page, setPage] = useState(1);
  const [playerID, setPlayerID] = useState("");
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [provider, setProvider] = useState("bkash");
  const [trxID, setTrxID] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const walletNumbers = {
    bkash: "016XXXXXXXX",
    nagad: "019XXXXXXXX",
  };

  const providerImages = {
    bkash: "./bkash.png",
    nagad: "./nagad.png",
  };

  const bundles = [
    { deposit: 500, bonus: 2750 },
    { deposit: 800, bonus: 4400 },
    { deposit: 1000, bonus: 5500 },
    { deposit: 2000, bonus: 11000 },
    { deposit: 3000, bonus: 16500 },
    { deposit: 5000, bonus: 27500 },
    { deposit: 10000, bonus: 55000 },
  ];

  const formatNumber = (num) => {
    return num.toLocaleString("bn-BD");
  };

  const handleDeposit = () => {
    if (playerID && selectedBundle !== null) {
      setPage(2);
    } else {
      alert("অনুগ্রহ করে সকল তথ্য পূরণ করুন");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletNumbers[provider]);
  };

  const handleSubmit = async () => {
    if (!trxID) {
      alert("অনুগ্রহ করে ট্রানজেকশন আইডি দিন");
      return;
    }

    try {
      // Simulating Firestore save
      const data = {
        playerID: playerID,
        Bundle: `${
          bundles[selectedBundle].deposit
        } ডিপোজিটে বোনাস ${formatNumber(bundles[selectedBundle].bonus)}`,
        TrxID: trxID,
        Provider: provider,
        timestamp: new Date().toISOString(),
      };

      console.log("Saving to Firestore:", data);

      // Show popup
      setShowPopup(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
        setPage(1);
        setPlayerID("");
        setSelectedBundle(null);
        setProvider("bkash");
        setTrxID("");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("একটি সমস্যা হয়েছে, আবার চেষ্টা করুন");
    }
  };

  return (
    <div className="app-container">
      {page === 1 ? (
        <div className="page page-1">
          <div className="content-wrapper">
            <h1 className="welcome-text">
              <span className="bold">স্বাগতম</span>, মেগা বান্ডেল বোনাসের জন্য
              আপনাকে নির্বাচিত করা হয়েছে।
            </h1>

            <div className="form-section">
              <label className="input-label">আইডির নাম অথবা ফোন নম্বর</label>
              <input
                type="text"
                className="text-input"
                value={playerID}
                onChange={(e) => setPlayerID(e.target.value)}
                placeholder="আপনার আইডি লিখুন"
              />
            </div>

            <div className="offers-section">
              <h2 className="offers-title">Mega Bundle Offer:</h2>

              <div className="radio-group">
                {bundles.map((bundle, index) => (
                  <label key={index} className="radio-option">
                    <input
                      type="radio"
                      name="bundle"
                      value={index}
                      checked={selectedBundle === index}
                      onChange={() => setSelectedBundle(index)}
                    />
                    <span className="radio-text">
                      {formatNumber(bundle.deposit)} ডিপোজিটে{" "}
                      <span className="bonus-text">
                        বোনাস {formatNumber(bundle.bonus)}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button className="deposit-button" onClick={handleDeposit}>
              ডিপোজিট করেন
            </button>
          </div>
        </div>
      ) : (
        <div className="page page-2">
          <div className="content-wrapper">
            <div className="bundle-display">
              <h2 className="selected-bundle">
                {formatNumber(bundles[selectedBundle].deposit)} ডিপোজিটে{" "}
                <span className="bonus-text">
                  বোনাস {formatNumber(bundles[selectedBundle].bonus)}
                </span>
              </h2>
            </div>

            <div className="provider-section">
              <label className="provider-label">
                পেমেন্ট প্রোভাইডার নির্বাচন করুন
              </label>
              <div className="provider-options">
                <label
                  className={`provider-option ${
                    provider === "bkash" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="provider"
                    value="bkash"
                    checked={provider === "bkash"}
                    onChange={(e) => setProvider(e.target.value)}
                  />
                  <span className="provider-name">Bkash</span>
                </label>
                <label
                  className={`provider-option ${
                    provider === "nagad" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="provider"
                    value="nagad"
                    checked={provider === "nagad"}
                    onChange={(e) => setProvider(e.target.value)}
                  />
                  <span className="provider-name">Nagad</span>
                </label>
              </div>
            </div>

            <div className="wallet-container">
              <div className="wallet-section">
                <label className="wallet-label">Wallet No</label>
                <div className="wallet-box">
                  <span className="wallet-number">
                    {walletNumbers[provider]}
                  </span>
                  <button className="copy-button" onClick={copyToClipboard}>
                    কপি
                  </button>
                </div>
              </div>

              <div className="provider-image-section">
                <label className="provider-image-label">Wallet Provider</label>
                <div className="provider-image-box">
                  <img
                    src={providerImages[provider]}
                    alt={provider}
                    className="provider-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="provider-placeholder"
                    style={{ display: "none" }}
                  >
                    {provider.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <label className="input-label">
                সেন্ড মানির নাম্বারটি অথবা সেন্ড মানি একাউন্টের নাম্বারটি লিখুন{" "}
                <span className="required">(প্রয়োজন)</span>
              </label>
              <input
                type="text"
                className="text-input"
                value={trxID}
                onChange={(e) => setTrxID(e.target.value)}
                placeholder="ট্রানজেকশন আইডি"
              />
            </div>

            <button className="confirm-button" onClick={handleSubmit}>
              নিশ্চিত
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-icon">✓</div>
            <h2 className="popup-text">ধন্যবাদ অপেক্ষা করুন</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
