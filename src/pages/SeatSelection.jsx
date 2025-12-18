import { useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/SeatSelection.css";

const THEATRES = {
  PVR: { price: 180, rows: ["A", "B", "C", "D"], seatsPerRow: 8, booked: ["A2", "B4"], times: ["10:30 AM", "2:15 PM", "7:30 PM"] },
  INOX: { price: 150, rows: ["A", "B", "C", "D", "E"], seatsPerRow: 10, booked: ["A1", "D5"], times: ["11:00 AM", "3:00 PM", "9:00 PM"] },
  IMAX: { price: 250, rows: ["A", "B", "C"], seatsPerRow: 6, booked: ["B3"], times: ["10:00 AM", "1:00 PM", "10:00 PM"] },
  AGS: { price: 200, rows: ["A", "B", "C", "D"], seatsPerRow: 8, booked: ["A3"], times: ["10:30 AM", "2:30 PM", "6:30 PM"] },
  SPI: { price: 160, rows: ["A", "B", "C", "D"], seatsPerRow: 8, booked: ["C2"], times: ["9:00 AM", "12:00 PM", "7:00 PM"] },
  CINEPOLIS: { price: 170, rows: ["A", "B", "C", "D", "E"], seatsPerRow: 9, booked: ["E4"], times: ["11:30 AM", "4:30 PM", "8:30 PM"] },
  LUXE: { price: 300, rows: ["A", "B", "C"], seatsPerRow: 5, booked: ["A1"], times: ["10:00 AM", "2:00 PM", "6:00 PM"] }
};

// Generate next 7 days
const getNextSevenDays = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push(date.toDateString());
  }
  return days;
};
const DATES = getNextSevenDays();


export default function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();

  const movie = location.state?.movie;
  const availableTheatres = movie?.theatres || [];

  const [theatre, setTheatre] = useState(availableTheatres[0] || "PVR");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [selectedDate, setSelectedDate] = useState(getNextSevenDays()[0]);
  const [selectedTime, setSelectedTime] = useState(THEATRES[theatre]?.times[0] || "");
  

  const [bookedSeatsMap, setBookedSeatsMap] = useState({
    [`PVR_${DATES[0]}_10:30 AM`]: ["A2", "B4"],
    [`PVR_${DATES[0]}_7:30 PM`]: ["C1", "C2"],
    [`PVR_${DATES[1]}_10:30 AM`]: ["A1", "A3"],
    [`INOX_${DATES[0]}_11:00 AM`]: ["A1"]
  });


  if (!movie) return <Container>Movie not found.</Container>;

  const currentTheatre = THEATRES[theatre];

  // ✅ ADDED: current show key
  const showKey = `${theatre}_${selectedDate}_${selectedTime}`;

  // ✅ ADDED: booked seats for selected show
  const bookedSeats = bookedSeatsMap[showKey] || [];


  const toggleSeat = (seatId) => {
    // ✅ FIXED: use dynamic booked seats
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

 const handleProceedToPay = () => {
    // We use the variables actually defined in your component
    navigate("/payment", {
      state: {
        movieId: movie.id,           
        movieTitle: movie.title,     
        date: selectedDate,
        time: selectedTime,
        selectedSeats: selectedSeats, 
        totalAmount: selectedSeats.length * currentTheatre.price, 
      }
    });
  };


  return (
    <Container className="seat-page py-4">
      <Row>
        <Col md={4} className="movie-sidebar border-end">
          <img src={movie.image} alt={movie.title} className="img-fluid rounded shadow mb-3" />
          <h3>{movie.title}</h3>
          <p className="text-muted small">{movie.description}</p>
        </Col>

        <Col md={8} className="ps-md-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Select Seats</h2>
            <Form.Select
              style={{ width: "200px" }}
              value={theatre}
              onChange={(e) => {
                setTheatre(e.target.value);
                setSelectedSeats([]);
                setSelectedTime(THEATRES[e.target.value].times[0]);
              }}
            >
              {movie.theatres.map((t) => (
                <option key={t} value={t}>{t} Cinemas</option>
              ))}
            </Form.Select>
          </div>

          {/* DATE */}
          <div className="booking-section mb-4">
            <h5 className="section-title">Select Date</h5>
            <div className="date-wrapper">
              {getNextSevenDays().map((date) => {
                const [dayName, month, dayNum] = date.split(" ");
                return (
                  <div
                    key={date}
                    className={`date-card ${selectedDate === date ? "active" : ""}`}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSeats([]);
                    }}
                  >
                    <span className="day-name">{dayName}</span>
                    <span className="day-number">{dayNum}</span>
                    <span className="month">{month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TIME */}
          <div className="booking-section mb-4">
            <h5 className="section-title">Select Time</h5>
            <div className="time-wrapper">
              {currentTheatre?.times?.map((time) => (
                <div
                  key={time}
                  className={`time-slot ${selectedTime === time ? "active" : ""}`}
                  onClick={() => {
                    setSelectedTime(time);
                    setSelectedSeats([]);
                  }}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          <div className="seat-layout mb-4">
            {currentTheatre.rows.map((row) => (
              <div key={row} className="seat-row d-flex justify-content-center">
                <span className="row-label me-3">{row}</span>
                {Array.from({ length: currentTheatre.seatsPerRow }).map((_, i) => {
                  const seatId = `${row}${i + 1}`;
                  const isBooked = bookedSeats.includes(seatId); // ✅ FIXED
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
            <p>Date: <strong>{selectedDate}</strong> | Time: <strong>{selectedTime}</strong></p>
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
