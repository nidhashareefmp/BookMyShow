// import { useState } from "react";
// import { Container, Button } from "react-bootstrap";
// import "../styles/SeatSelection.css";
// import { useLocation } from "react-router-dom";

// export default function SeatSelection() {
//   const location = useLocation();

//   const movie = location.state?.movie || "Selected Movie";
//   const availableTheatres = location.state?.theatres || ["PVR", "INOX", "IMAX"];

//   const [theatre, setTheatre] = useState(availableTheatres[0]);
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   return (
//     <Container className="seat-page">
//       <h2>Select Seats</h2>

//       <div className="screen">SCREEN</div>

//       <div className="seat-layout">
//         {ROWS.map((row) => (
//           <div key={row} className="seat-row">
//             <span className="row-label">{row}</span>

//             {Array.from({ length: SEATS_PER_ROW }).map((_, index) => {
//               const seatId = `${row}${index + 1}`;

//               return (
//                 <div
//                   key={seatId}
//                   className={`seat
//                     ${BOOKED_SEATS.includes(seatId) ? "booked" : ""}
//                     ${selectedSeats.includes(seatId) ? "selected" : ""}
//                   `}
//                   onClick={() => handleSeatClick(seatId)}
//                 >
//                   {index + 1}
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>

//       <div className="summary">
//         <p>
//           Selected Seats:{" "}
//           <strong>{selectedSeats.join(", ") || "None"}</strong>
//         </p>

//         <p>Total Price: ₹{selectedSeats.length * 150}</p>

//         <Button
//           variant="danger"
//           disabled={selectedSeats.length === 0}
//         >
//           Proceed to Pay
//         </Button>
//       </div>
//     </Container>
//   );
// }




import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const THEATRES = {
  PVR: { price: 180, rows: ["A", "B", "C", "D"], seatsPerRow: 8, booked: ["A2","B4"] },
  INOX: { price: 150, rows: ["A","B","C","D","E"], seatsPerRow: 10, booked: ["A1","D5"] },
  IMAX: { price: 250, rows: ["A","B","C"], seatsPerRow: 6, booked: ["B3"] },
  AGS: { price: 200, rows: ["A","B","C","D"], seatsPerRow: 8, booked: ["A3"] },
  SPI: { price: 160, rows: ["A","B","C","D"], seatsPerRow: 8, booked: ["C2"] }
};

export default function SeatSelection() {
  const location = useLocation();
  const movie = location.state?.movie;
  const [theatre, setTheatre] = useState(movie.theatres[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const currentTheatre = THEATRES[theatre];

  const toggleSeat = (seat) => {
    if (currentTheatre.booked.includes(seat)) return;
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  return (
    <Container className="seat-page">
      <h2>{movie.title} - Select Theatre & Seats</h2>

      <Form.Select
        className="mb-3"
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

      <div className="screen">SCREEN</div>

      <div className="seat-layout">
        {currentTheatre.rows.map((row) => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>
            {Array.from({ length: currentTheatre.seatsPerRow }).map((_, i) => {
              const seatId = `${row}${i+1}`;
              const isBooked = currentTheatre.booked.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);
              return (
                <div
                  key={seatId}
                  className={`seat ${isBooked ? "booked" : ""} ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleSeat(seatId)}
                >
                  {i+1}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="summary">
        <p>Selected Seats: <strong>{selectedSeats.join(", ") || "None"}</strong></p>
        <p>Total Price: ₹{selectedSeats.length * currentTheatre.price}</p>
        <Button variant="danger" disabled={selectedSeats.length === 0}>Proceed to Pay</Button>
      </div>
    </Container>
  );
}
