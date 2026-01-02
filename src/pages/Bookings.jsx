import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Badge, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Bookings.css";

export default function Bookings() {
  const [myBookings, setMyBookings] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const userBookings = allBookings.filter(
      b => b.userEmail === user.email || b.userEmail === user.phone
    );

    setMyBookings(userBookings);
  }, [user]);

  // ✅ REDIRECT instead of trapping UI
  if (!user) {
    return (
      <Container className="signin-container">
        <Card className="signin-card p-5">
          <h3 className="signin-title">
            Please sign in to see your bookings
          </h3>

          <Button
            className="signin-btn mt-4"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>

          {/* ✅ allow navigation */}
          <Button
            variant="link"
            className="mt-3"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="my-bookings-heading">My Bookings 🎟️</h2>

      {myBookings.length === 0 ? (
        <Alert variant="info">
          No bookings yet. Book your first movie! 🍿
        </Alert>
      ) : (
        <Row>
          {myBookings.map((booking) => (
            <Col md={6} key={booking.id} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Card.Title className="fw-bold">
                        {booking.movieTitle}
                      </Card.Title>

                      <Card.Text className="text-muted mb-1">
                        📅 {booking.date} | 🕒 {booking.time}
                      </Card.Text>

                      <div className="mt-2">
                        <strong>Seats:</strong>{" "}
                        {booking.seats.map(seat => (
                          <Badge bg="danger" className="me-1" key={seat}>
                            {seat}
                          </Badge>
                        ))}
                      </div>

                      <p className="mt-2 fw-bold text-danger">
                        ₹{booking.amount}
                      </p>
                    </div>

                    <Badge bg="success">Confirmed</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Button
        variant="outline-primary"
        onClick={() => navigate("/movies")}
        className="mt-4"
      >
        Book Another Movie
      </Button>
    </Container>
  );
}
