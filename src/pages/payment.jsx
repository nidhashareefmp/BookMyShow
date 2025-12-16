import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import "../styles/Payment.css";

export default function Payment() {
  const { state } = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user")
  );

  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState("");

  if (!state) return <Container>No booking details found</Container>;

  // ✅ VALIDATION
  const validatePayment = () => {
    setError("");

    if (!isLoggedIn) {
      setError("Please sign in to continue payment");
      return false;
    }

    if (method === "upi") {
      const upiRegex = /^[\w.-]+@[\w.-]+$/;
      if (!upiRegex.test(upiId)) {
        setError("Enter a valid UPI ID");
        return false;
      }
    }

    if (method === "card") {
      if (
        card.number.length !== 16 ||
        card.cvv.length !== 3 ||
        !card.name ||
        !card.expiry
      ) {
        setError("Enter valid card details");
        return false;
      }
    }

    return true;
  };


  const handleSignIn = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "Demo User" })
    );
    setIsLoggedIn(true);
    setError("");
  };



  const handlePayNow = () => {
    if (!validatePayment()) return;
    alert("Payment Successful 🎉");
  };


  const user = JSON.parse(localStorage.getItem("user"));

  emailjs.send(
    "YOUR_SERVICE_ID",
    "PAYMENT_TEMPLATE_ID",
    {
      user_name: user.name,
      user_email: user.email,
      message: `Payment of ₹${state.totalAmount} successful for ${state.movieTitle}`,
    },
    "YOUR_PUBLIC_KEY"
  );

  alert("Payment Successful 🎉");


  return (
    <Container className="payment-container">
      <Card className="payment-card">
        <h3 className="payment-title">Payment</h3>

        <p><strong>Total:</strong> ₹{state.totalAmount}</p>

        {/* 🔹 UPI */}
        <div
          className={`payment-method ${method === "upi" ? "active" : ""}`}
          onClick={() => setMethod("upi")}
        >
          <input type="radio" checked={method === "upi"} readOnly />
          UPI
          {method === "upi" && (
            <div className="payment-input">
              <input
                type="text"
                placeholder="example@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* 🔹 CARD */}
        <div
          className={`payment-method ${method === "card" ? "active" : ""}`}
          onClick={() => setMethod("card")}
        >
          <input type="radio" checked={method === "card"} readOnly />
          Credit / Debit Card

          {method === "card" && (
            <div className="payment-input">
              <input
                placeholder="Card Number"
                maxLength="16"
                onChange={(e) =>
                  setCard({ ...card, number: e.target.value })
                }
              />
              <input
                placeholder="Card Holder Name"
                onChange={(e) =>
                  setCard({ ...card, name: e.target.value })
                }
              />
              <input
                placeholder="MM/YY"
                onChange={(e) =>
                  setCard({ ...card, expiry: e.target.value })
                }
              />
              <input
                placeholder="CVV"
                maxLength="3"
                onChange={(e) =>
                  setCard({ ...card, cvv: e.target.value })
                }
              />
            </div>
          )}
        </div>

        {error && <p className="error-text">{error}</p>}

        {!isLoggedIn ? (
          <Button
            variant="primary"
            className="pay-btn"
            onClick={handleSignIn}
          >
            Sign In to Continue
          </Button>
        ) : (
          <Button
            variant="danger"
            className="pay-btn"
            onClick={handlePayNow}
          >
            Pay Now
          </Button>
        )}

        {!isLoggedIn && (
          <p className="error-text mt-2 text-center">
            Please sign in to complete your booking
          </p>
        )}

      </Card>
    </Container>
  );
}
