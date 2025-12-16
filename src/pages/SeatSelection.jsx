
import { useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap"; // Added Row, Col
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/SeatSelection.css";

const THEATRES = {
  PVR: { price: 180, rows: ["A", "B", "C", "D"], seatsPerRow: 8, booked: ["A2", "B4"] },
  INOX: { price: 150, rows: ["A", "B", "C", "D", "E"], seatsPerRow: 10, booked: ["A1", "D5"] },
  IMAX: { price: 250, rows: ["A", "B", "C"], seatsPerRow: 6, booked: ["B3"] },
  AGS: { price: 200, rows: ["A", "B", "C", "D"], seatsPerRow: 8, booked: ["A3"] },
  SPI: { price: 160, rows: ["A", "B", "C", "D"], seatsPerRow: 8, booked: ["C2"] },
  CINEPOLIS: { price: 170, rows: ["A", "B", "C", "D", "E"], seatsPerRow: 9, booked: ["E4"] },
  LUXE: { price: 300, rows: ["A", "B", "C"], seatsPerRow: 5, booked: ["A1"] }
};


export default function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();

  const movie = location.state?.movie;
  const [theatre, setTheatre] = useState(movie?.theatres[0] || "PVR");
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!movie) return <Container>Movie not found.</Container>;

  const currentTheatre = THEATRES[theatre];

  const toggleSeat = (seatId) => {
    if (currentTheatre.booked.includes(seatId)) return;
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const handleProceedToPay = () => {
    const bookingDetails = {
      movieId: movie.id,
      movieTitle: movie.title,
      theatre,
      seats: selectedSeats,
      seatPrice: currentTheatre.price,
      totalAmount: selectedSeats.length * currentTheatre.price,
      showTime: "7:30 PM",
    };

    navigate("/payment", { state: bookingDetails });
  };



  return (
    <Container className="seat-page py-4">
      <Row>
        {/* LEFT SIDE: Movie Info Sidebar */}
        <Col md={4} className="movie-sidebar border-end">
          <img
            src={movie.image}
            alt={movie.title}
            className="img-fluid rounded shadow mb-3"
          />
          <h3>{movie.title}</h3>

          <div className="artist-info mt-4">
            <h5>Lead Artist</h5>
            {/* Assuming your movie object has an artistImage property */}
            <img
              src={movie.artistImage || "https://via.placeholder.com/80"}
              alt="Artist"
              className="rounded-circle mb-2"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <p className="text-muted small">{movie.description || "No description available for this movie."}</p>
          </div>
        </Col>

        {/* RIGHT SIDE: Seat Selection */}
        <Col md={8} className="ps-md-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="top">Select Seats</h2>
            <Form.Select
              style={{ width: "200px" }}
              value={theatre}
              onChange={(e) => {
                setTheatre(e.target.value);
                setSelectedSeats([]);
              }}
            >
              {movie.theatres.map((t) => (
                <option key={t} value={t}>{t} Cinemas</option>
              ))}
            </Form.Select>
          </div>

          <div className="screen-container mb-5">
            <div className="screen">SCREEN</div>
          </div>

          <div className="seat-layout mb-4">
            {currentTheatre.rows.map((row) => (
              <div key={row} className="seat-row d-flex justify-content-center align-items-center">
                <span className="row-label me-3" style={{ width: "20px" }}>{row}</span>
                {Array.from({ length: currentTheatre.seatsPerRow }).map((_, i) => {
                  const seatId = `${row}${i + 1}`;
                  const isBooked = currentTheatre.booked.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);
                  return (
                    <div
                      key={seatId}
                      className={`seat ${isBooked ? "booked" : ""} ${isSelected ? "selected" : ""}`}
                      onClick={() => toggleSeat(seatId)}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="summary p-3 bg-light rounded shadow-sm">
            <p>Selected Seats: <strong>{selectedSeats.join(", ") || "None"}</strong></p>
            <p className="h5">Total Price: ₹{selectedSeats.length * currentTheatre.price}</p>
            <Button
              variant="danger"
              className="w-100 mt-2"
              disabled={selectedSeats.length === 0}
              onClick={handleProceedToPay}
            >
              Proceed to Pay
            </Button>

          </div>
        </Col>
      </Row>
    </Container>
  );
}