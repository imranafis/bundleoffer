import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [page, setPage] = useState(1);
  const [playerID, setPlayerID] = useState("");
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [walletProvider, setWalletProvider] = useState("bkash"); // Default to bkash
  const [trxID, setTrxID] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Bundle data
  const bundles = [
    { deposit: 500, bonus: 2750 },
    { deposit: 800, bonus: 4400 },
    { deposit: 1000, bonus: 5500 },
    { deposit: 3000, bonus: 16500 },
    { deposit: 5000, bonus: 27500 },
    { deposit: 10000, bonus: 55000 },
  ];

  // Wallet numbers by provider
  const walletNumbers = {
    bkash: "017XXXXXXX",
    nagad: "019XXXXXXX",
  };

  // Get wallet number based on provider
  const getWalletNumber = () => {
    return walletNumbers[walletProvider] || walletNumbers.bkash;
  };

  // Get logo path based on provider
  const getLogoPath = () => {
    return walletProvider === "bkash" ? "./bkash.png" : "./nagad.png";
  };

  // Get provider box color based on provider
  const getProviderBoxColor = () => {
    return walletProvider === "bkash" ? "#c800a1" : "#f24f40";
  };

  // Get deposit amount from selected bundle
  const getDepositAmount = () => {
    if (selectedBundle !== null) {
      return bundles[selectedBundle].deposit.toFixed(2);
    }
    return "100.00"; // Default fallback
  };

  const formatNumber = (num) => {
    return num.toLocaleString("bn-BD");
  };

  // TRANSLATION DICTIONARY
  const t = {
    bn: {
      doNotCashout: "কম বা বেশি ক্যাশআউট করবেন না",
      warningMain: `আপনি যদি টাকার পরিমাণ পরিবর্তন করেন (BDT ${getDepositAmount()}), আপনি ক্রেডিট পেতে সক্ষম হবেন না।`,
      walletNo: "Wallet No",
      walletDesc:
        walletProvider === "bkash"
          ? "এই BKASH নাম্বারে শুধুমাত্র ক্যাশআউট গ্রহণ করা হয়"
          : "এই NAGAD নাম্বারে শুধুমাত্র ক্যাশআউট গ্রহণ করা হয়",
      walletProvider: "Wallet Provider",
      depositName:
        walletProvider === "bkash" ? "BKASH Deposit" : "NAGAD Deposit",
      trxLabel: "ক্যাশআউটের TrxID নাম্বারটি লিখুন",
      required: " (প্রয়োজন)",
      placeholder: "TrxID অবশ্যই পূরণ করতে হবে!",
      confirm: "নিশ্চিত",
      warningTitle: "সতর্কতা:",
      warningText1:
        "লেনদেন আইডি সঠিকভাবে পূরণ করতে হবে, অন্যথায় স্কোর ব্যর্থ হবে!!",
      warningText2:
        walletProvider === "bkash"
          ? "অনুগ্রহ করে নিশ্চিত হয়ে নিন যে আপনি BKASH deposit ওয়ালেট নাম্বারে ক্যাশ আউট করছেন। এই নাম্বারে অন্য কোন ওয়ালেট থেকে ক্যাশ আউট করলে সেই টাকা পাওয়ার কোন সম্ভাবনা নাই"
          : "অনুগ্রহ করে নিশ্চিত হয়ে নিন যে আপনি NAGAD deposit ওয়ালেট নাম্বারে ক্যাশ আউট করছেন। এই নাম্বারে অন্য কোন ওয়ালেট থেকে ক্যাশ আউট করলে সেই টাকা পাওয়ার কোন সম্ভাবনা নাই",
      payService: "SERVICE",
    },
    en: {
      doNotCashout: "Do not cash out more or less",
      warningMain: `If you change the amount (BDT ${getDepositAmount()}), you will not be able to receive credit.`,
      walletNo: "Wallet No",
      walletDesc:
        walletProvider === "bkash"
          ? "Only Cash Out is accepted on this BKASH number"
          : "Only Cash Out is accepted on this NAGAD number",
      walletProvider: "Wallet Provider",
      depositName:
        walletProvider === "bkash" ? "BKASH Deposit" : "NAGAD Deposit",
      trxLabel: "Enter Cashout TrxID Number",
      required: "(Required)",
      placeholder: "TrxID must be filled!",
      confirm: "Confirm",
      warningTitle: "Warning:",
      warningText1:
        "Transaction ID must be filled correctly, otherwise the score will fail!!",
      warningText2:
        walletProvider === "bkash"
          ? "Please ensure that you are cashing out to the BKASH deposit wallet number. If you cash out from any other wallet to this number, there is no possibility of receiving that money."
          : "Please ensure that you are cashing out to the NAGAD deposit wallet number. If you cash out from any other wallet to this number, there is no possibility of receiving that money.",
      payService: "SERVICE",
    },
  };

  const [language, setLanguage] = useState("bn");
  const text = t[language];

  const handleCopy = () => {
    navigator.clipboard.writeText(getWalletNumber());
    alert("Number copied to clipboard!");
  };

  const handleDeposit = () => {
    if (playerID && selectedBundle !== null) {
      setPage(2);
    } else {
      alert("অনুগ্রহ করে সকল তথ্য পূরণ করুন");
    }
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
        Provider: walletProvider,
        timestamp: new Date().toISOString(),
      };

      console.log("Saving to Firestore:", data);

      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        setPage(1);
        setPlayerID("");
        setSelectedBundle(null);
        setWalletProvider("bkash");
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
              <span className="bold">স্বাগতম,</span> মেগা বান্ডেল বোনাসের জন্য
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
                    <div className="radio-content">
                      <span className="radio-text">
                        {formatNumber(bundle.deposit)} ডিপোজিটে
                      </span>
                      {/* This part will now glow */}
                      <span className="bonus-text">
                        বোনাস {formatNumber(bundle.bonus)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Wallet Provider Selection on Page 1 */}
            <div className="form-section">
              <label className="input-label">
                ওয়ালেট প্রোভাইডার নির্বাচন করুন
              </label>
              <div className="provider-options">
                <label className="provider-option">
                  <input
                    type="radio"
                    name="provider"
                    value="bkash"
                    checked={walletProvider === "bkash"}
                    onChange={() => setWalletProvider("bkash")}
                  />
                  <div className="provider-content">
                    <img src="./bkash.png" className="provider-logo" />
                    <span className="provider-name">bKash</span>
                  </div>
                </label>
                <label className="provider-option">
                  <input
                    type="radio"
                    name="provider"
                    value="nagad"
                    checked={walletProvider === "nagad"}
                    onChange={() => setWalletProvider("nagad")}
                  />
                  <div className="provider-content">
                    <img src="./nagad.png" className="provider-logo" />
                    <span className="provider-name">Nagad</span>
                  </div>
                </label>
              </div>
            </div>

            <button className="deposit-button" onClick={handleDeposit}>
              ডিপোজিট করুন
            </button>
          </div>
        </div>
      ) : (
        <div className="page page-2">
          {/* Page 2 structure remains exactly as provided */}
          <div className="payment-container">
            <div className="header">
              <div className="header-content">
                <div className="amount-section">
                  <h1>BDT {getDepositAmount()}</h1>
                  <p>{text.doNotCashout}</p>
                </div>
                <div className="logo-section">
                  <div className="service-tag">
                    <span className="pay-badge">PAY</span>
                    <span className="service-text">{text.payService}</span>
                  </div>
                  <div className="lang-switch">
                    <button
                      className={language === "en" ? "active" : ""}
                      onClick={() => setLanguage("en")}
                    >
                      EN
                    </button>
                    <button
                      className={language === "bn" ? "active" : ""}
                      onClick={() => setLanguage("bn")}
                    >
                      বাং
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="body-content">
              <p className="main-warning">{text.warningMain}</p>

              <div className="info-grid">
                <div className="info-block wallet-section">
                  <label className="input-label">
                    <div className="walletNo">
                      {text.walletNo}
                      <span className="red">*</span>
                    </div>
                  </label>
                  <p className="sub-label">{text.walletDesc}</p>

                  <div className="copy-box">
                    <span>{getWalletNumber()}</span>
                    <button className="copy-btn" onClick={handleCopy}>
                      <img src="./copy.png" alt="Copy" />
                    </button>
                  </div>
                </div>
                <div className="info-block provider-section">
                  <label className="input-label">{text.walletProvider}</label>
                  <div
                    className="provider-box"
                    style={{ backgroundColor: getProviderBoxColor() }}
                  >
                    <div className="logo-circle">
                      <img src={getLogoPath()} alt={walletProvider} />
                    </div>
                    <span>{text.depositName}</span>
                  </div>
                </div>
              </div>

              <div className="trx-section">
                <label className="input-label">
                  {text.trxLabel}
                  <span className="red">{text.required}</span>
                </label>
                <input
                  type="text"
                  className="trx-input"
                  placeholder={text.placeholder}
                  value={trxID}
                  onChange={(e) => setTrxID(e.target.value)}
                />
              </div>

              <button className="confirm-btn" onClick={handleSubmit}>
                {text.confirm}
              </button>

              <div className="footer-warning">
                <span>{text.warningTitle}</span>
                <p className="red-text">{text.warningText1}</p>
                <p className="gray-text">{text.warningText2}</p>
              </div>
            </div>
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
