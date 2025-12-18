import React from "react";
import "./Offers.css";

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "50% OFF First Order",
      description: "Get 50% discount on your first order. Valid for new users only.",
      code: "FIRST50",
      discount: "50% OFF",
      validUntil: "Dec 31, 2024",
      minOrder: "$15",
      image: "🎉"
    },
    {
      id: 2,
      title: "Free Delivery Weekend",
      description: "Enjoy free delivery on all orders during weekends.",
      code: "WEEKEND",
      discount: "Free Delivery",
      validUntil: "Every Weekend",
      minOrder: "$10",
      image: "🚚"
    },
    {
      id: 3,
      title: "Buy 2 Get 1 Free",
      description: "Order 2 pizzas and get 1 free. Valid at Pizza Palace only.",
      code: "PIZZA321",
      discount: "1 Free Pizza",
      validUntil: "Jan 15, 2025",
      minOrder: "$25",
      image: "🍕"
    },
    {
      id: 4,
      title: "Student Discount",
      description: "20% off for students with valid student ID verification.",
      code: "STUDENT20",
      discount: "20% OFF",
      validUntil: "Ongoing",
      minOrder: "$12",
      image: "🎓"
    },
    {
      id: 5,
      title: "Happy Hour Special",
      description: "30% off on all orders between 2 PM - 5 PM daily.",
      code: "HAPPY30",
      discount: "30% OFF",
      validUntil: "Daily 2-5 PM",
      minOrder: "$8",
      image: "⏰"
    },
    {
      id: 6,
      title: "Family Feast Deal",
      description: "Order for 4+ people and save 25% on your total bill.",
      code: "FAMILY25",
      discount: "25% OFF",
      validUntil: "Feb 28, 2025",
      minOrder: "$40",
      image: "👨👩👧👦"
    }
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Code ${code} copied to clipboard!`);
  };

  return (
    <div className="offers-page">
      <div className="offers-header">
        <h1>Special Offers</h1>
        <p>Save more with our exclusive deals and discounts</p>
      </div>

      <div className="offers-grid">
        {offers.map(offer => (
          <div key={offer.id} className="offer-card">
            <div className="offer-badge">{offer.discount}</div>
            <div className="offer-icon">{offer.image}</div>
            
            <div className="offer-content">
              <h3>{offer.title}</h3>
              <p className="offer-description">{offer.description}</p>
              
              <div className="offer-details">
                <div className="detail-item">
                  <span className="label">Code:</span>
                  <span className="code" onClick={() => copyCode(offer.code)}>
                    {offer.code}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Min Order:</span>
                  <span>{offer.minOrder}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Valid Until:</span>
                  <span>{offer.validUntil}</span>
                </div>
              </div>

              <button className="claim-offer">Claim Offer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;