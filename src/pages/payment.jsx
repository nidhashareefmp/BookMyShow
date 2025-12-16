import { Container, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <Container>Invalid booking.</Container>;

  return (
    <Container className="py-5">
      <h2>Payment Summary</h2>

      <p><strong>Movie:</strong> {state.movieTitle}</p>
      <p><strong>Theatre:</strong> {state.theatre}</p>
      <p><strong>Seats:</strong> {state.seats.join(", ")}</p>
      <p><strong>Price per seat:</strong> ₹{state.seatPrice}</p>
      <h4>Total: ₹{state.totalAmount}</h4>

      <Button
        variant="success"
        className="mt-3"
        onClick={() => alert("Payment Successful 🎉")}
      >
        Pay Now
      </Button>

      <Button
        variant="secondary"
        className="mt-3 ms-2"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </Container>
  );
}
