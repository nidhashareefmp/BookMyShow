import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Alert } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { AuthContext } from "../context/AuthContext";
import "../styles/Payment.css";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log("Data received from previous page:", state);
  console.log("All bookings:", JSON.parse(localStorage.getItem("bookings")));

  // ✅ USE CONTEXT (Fixes synchronization issue)
  const { user } = useContext(AuthContext);

  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [error, setError] = useState("");

  // ✅ 1. SECURITY GUARD: Redirect if no booking data
  useEffect(() => {
    if (!state) {
      alert("No booking details found. Redirecting to home...");
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;


  // ✅ 2. AUTHENTICATION CHECK
  const isLoggedIn = !!user;

  // ✅ 3. VALIDATION LOGIC
  const validatePayment = () => {
    setError("");

    if (!isLoggedIn) {
      setError("Session expired. Please sign in again.");
      return false;
    }

    if (method === "upi") {
      const upiRegex = /^[\w.-]+@[\w.-]+$/;
      if (!upiRegex.test(upiId)) {
        setError("Enter a valid UPI ID (e.g., name@bank)");
        return false;
      }
    }

    if (method === "card") {
      if (card.number.length !== 16 || card.cvv.length !== 3 || !card.name || !card.expiry) {
        setError("Please enter complete and valid card details.");
        return false;
      }
    }

    return true;
  };

  // ✅ 4. PAYMENT HANDLER
  const handlePayNow = async () => {
    if (!validatePayment()) return;

    try {
      // ✅ SAVE SEAT LOCKING (keep this)
      const bookingKey = `bookedSeats_${state.movieId || state.movie?.id}_${state.date}_${state.time || state.showTime}`;
      const existingSeats =
        JSON.parse(localStorage.getItem(bookingKey)) || [];

      const updatedSeats = [
        ...new Set([...existingSeats, ...state.selectedSeats])
      ];

      localStorage.setItem(bookingKey, JSON.stringify(updatedSeats));

      const newBooking = {
        id: Date.now(),
        movieId: state.movieId || state.movie?.id,
        movieTitle: state.movieTitle || state.movie?.title,
        date: state.date,
        time: state.time || state.showTime,
        seats: state.selectedSeats,
        amount: state.totalAmount || state.totalPrice,
        userEmail: user.email || user.phone // ✅ Fallback to phone for ID
      };


      const existingBookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

      localStorage.setItem(
        "bookings",
        JSON.stringify([...existingBookings, newBooking])
      );

      // ✅ SEND EMAIL ONLY IF EMAIL EXISTS
      if (user.email && user.email.includes("@")) {
        try {
          await emailjs.send(
            "service_c49p7nl",
            "template_pa6oe0c",
            {
              firstname: user.name,
              email: user.email,
              movie_title: state.movieTitle,
              amount: state.totalAmount,
              seats: state.selectedSeats.join(", "),
              date: state.date,
              time: state.time
            },
            "6dstiV_-yu9MD2ep3"
          );
        } catch (mailErr) {
          console.warn("Email failed but booking saved", mailErr);
        }
      }

      alert("Payment Successful 🎉");
      navigate("/bookings");

    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <Container className="payment-container my-5">
      <Card className="payment-card p-4 shadow">
        <h3 className="text-center mb-4">Secure Payment</h3>

        <div className="booking-summary mb-4 p-3 bg-light rounded">
          <h5>{state.movieTitle}</h5>
          <p className="mb-1">
            <strong>📅 Date:</strong> {state.date || "N/A"} |{" "}
            <strong>🕒 Time:</strong> {state.time || "N/A"}
          </p>

          <p className="mb-1">
            <strong>Seats:</strong>{" "}
            {Array.isArray(state.selectedSeats) && state.selectedSeats.length > 0
              ? state.selectedSeats.join(", ")
              : "None"}
          </p>

          <p className="mb-0 text-danger fw-bold">
            <strong>Total Amount:</strong> ₹{state.totalAmount}
          </p>
        </div>

        {!isLoggedIn ? (
          <div className="auth-prompt text-center">
            <Alert variant="warning">You must be signed in to complete this purchase.</Alert>
            <Button
              variant="primary"
              onClick={() => {
                window.dispatchEvent(new Event("open-auth-modal"));
              }}
            >
              Sign In to Pay
            </Button>

          </div>
        ) : (
          <>
            <div className="user-badge mb-3 text-muted">
              Logged in as: <strong>{user.email}</strong>
            </div>

            {/* UPI Section */}
            <div className={`payment-option ${method === "upi" ? "selected" : ""}`} onClick={() => setMethod("upi")}>
              <input type="radio" checked={method === "upi"} onChange={() => setMethod("upi")} />
              <label className="ms-2">UPI (GPay, PhonePe, Paytm)</label>
              {method === "upi" && (
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="username@bank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              )}
            </div>

            {/* Card Section */}
            <div className={`payment-option mt-3 ${method === "card" ? "selected" : ""}`} onClick={() => setMethod("card")}>
              <input type="radio" checked={method === "card"} onChange={() => setMethod("card")} />
              <label className="ms-2">Credit / Debit Card</label>
              {method === "card" && (
                <div className="card-inputs mt-2">
                  <input className="form-control mb-2" placeholder="16 Digit Card Number" maxLength="16" onChange={(e) => setCard({ ...card, number: e.target.value })} />
                  <input className="form-control mb-2" placeholder="Card Holder Name" onChange={(e) => setCard({ ...card, name: e.target.value })} />
                  <div className="d-flex gap-2">
                    <input className="form-control" placeholder="MM/YY" onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                    <input className="form-control" placeholder="CVV" maxLength="3" onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
                  </div>
                </div>
              )}
            </div>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <Button variant="danger" className="w-100 mt-4 py-2" onClick={handlePayNow}>
              Confirm & Pay ₹{state.totalAmount}
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
}