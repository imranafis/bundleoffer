import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [playerId, setPlayerId] = useState("");
  const [selectedOfferId, setSelectedOfferId] = useState("");

  const offers = [
    { id: 1, deposit: "৫০০", bonus: "২৭৫০" },
    { id: 2, deposit: "৮০০", bonus: "৪৪০০" },
    { id: 3, deposit: "১০০০", bonus: "৫৫০০" },
    { id: 4, deposit: "২০০০", bonus: "১১,০০০" },
    { id: 5, deposit: "৩০০০", bonus: "১৬,৫০০" },
    { id: 6, deposit: "৫০০০", bonus: "২৭,৫০০" },
    { id: 7, deposit: "১০,০০০", bonus: "৫৫,০০০" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerId && selectedOfferId) {
      const selectedOfferData = offers.find(
        (offer) => offer.id.toString() === selectedOfferId
      );

      if (selectedOfferData) {
        navigate("/deposit", {
          state: {
            playerId,
            selectedOffer: selectedOfferData,
          },
        });
      } else {
        alert("অফার সঠিকভাবে নির্বাচন করুন");
      }
    } else {
      alert("দয়া করে আইডি এবং অফার নির্বাচন করুন");
    }
  };

  return (
    <div className="home-container">
      {/* ... rest of your HomePage code remains the same ... */}
    </div>
  );
};

export default HomePage;
