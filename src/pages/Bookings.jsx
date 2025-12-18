import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Badge, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Bookings() {
  const [myBookings, setMyBookings] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const allBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const userBookings = allBookings.filter(
      b => b.userEmail === user.email
    );

    setMyBookings(userBookings);
  }, [user]);

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <Card className="p-5 shadow">
          <h3>Please sign in to see your bookings</h3>
          <Button
            className="mt-3"
            onClick={() =>
              window.dispatchEvent(new Event("open-auth-modal"))
            }
          >
            Sign In
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">My Bookings 🎟️</h2>

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

                    <Badge bg="success" className="align-self-start">
                      Confirmed
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Button
        variant="outline-primary"
        onClick={() => navigate("/")}
        className="mt-4"
      >
        Back to Home
      </Button>
    </Container>
  );
}
