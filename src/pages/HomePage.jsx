import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Modal
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import { StrangerthingsImg } from "../assets/images";

export default function HomePage() {
  const [latestMovies, setLatestMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        return res.json();
      })
      .then(data => {
        setLatestMovies(data.slice(0, 4));
        setError(null);
      })
      .catch(err => {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please make sure the backend server is running (npm run server).");
      });
  }, []);

  const [error, setError] = useState(null);

  const [showCoupons, setShowCoupons] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");
  const [showTheatres, setShowTheatres] = useState(false);

  const bogoTheatres = [
    {
      name: "PVR Cinemas",
      movies: ["Guardians of the Galaxy", "Avengers: Endgame"],
    },
    {
      name: "INOX",
      movies: ["Stranger Things", "Interstellar"],
    },
    {
      name: "Cinepolis",
      movies: ["Oppenheimer", "Dune: Part Two"],
    },
  ];


  return (
    <>
      {/* ===== BANNER CARD ===== */}
      <Container className="banner-card my-4">
        <Row className="align-items-center">
          {/* LEFT IMAGE */}
          <Col md={5}>
            <img
              src={StrangerthingsImg}
              alt="Guardians of the Galaxy"
              className="banner-image"
            />
          </Col>

          {/* RIGHT CONTENT */}
          <Col md={7}>
            <div className="banner-content">
              <p className="studio">Marvel Studios</p>

              <h2 className="banner-title">
                Guardians of the Galaxy
              </h2>

              <p className="banner-description">
                A group of intergalactic criminals must pull together to stop a
                fanatical warrior with plans to purge the universe.
              </p>

              <Button
                variant="danger"
                as={Link}
                to="/movies"
              >
                Explore Movies →
              </Button>
            </div>
          </Col>
        </Row>
      </Container>


      {/* ===== ERROR ALERT ===== */}
      {error && (
        <Container className="my-4">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </Container>
      )}

      {/* ===== LATEST RELEASE ===== */}
      <Container className="latest-release-section">
        <h2 className="section-title text-start">Latest Release</h2>

        <Row className="g-4">
          {latestMovies.map((movie) => (
            <Col md={3} sm={6} key={movie.id}>
              <Card className="booking-card">
                <Card.Img variant="top" src={movie.image} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>

                  <Button
                    variant="danger"
                    className="w-100 mt-3"
                    as={Link}
                    to="/seats"
                    state={{ movie }}
                  >
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ===== OFFERS & DISCOUNTS ===== */}
      <Container className="offers-section my-5">
        <h2 className="section-title text-start">Offers & Discounts</h2>

        <Row className="g-4">
          <Col md={4}>
            <Card className="offer-card offer-red">
              <Card.Body>
                <h5>Flat ₹100 OFF</h5>
                <p>First booking only · Use code QUICK100</p>
                <Button
                  variant="light"
                  as={Link}
                  to="/movies"
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="offer-card offer-blue">
              <Card.Body>
                <h5>Buy 1 Get 1 Free</h5>
                <p>Available on selected theatres</p>
                <Button
                  variant="light"
                  onClick={() => setShowTheatres(true)}
                >
                  View Theatres
                </Button>

              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="offer-card offer-green">
              <Card.Body>
                <h5>20% Cashback</h5>
                <p>Pay using UPI & wallets</p>
                <Button
                  variant="light"
                  onClick={() => setShowCoupons(true)}
                >
                  Grab Offer
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ===== WHY QUICKSHOW ===== */}
      <Container className="why-quickshow my-5">
        <h2 className="section-title text-center">Why QuickShow?</h2>

        <Row className="text-center mt-4">
          <Col md={4}>
            <h5>🎟 Easy Booking</h5>
            <p>Select movies, seats, and book in seconds.</p>
          </Col>

          <Col md={4}>
            <h5>💳 Secure Payments</h5>
            <p>UPI, cards, and wallets with full security.</p>
          </Col>

          <Col md={4}>
            <h5>🍿 Best Experience</h5>
            <p>Comfortable seats and best theatres near you.</p>
          </Col>
        </Row>
      </Container>


      {/* ===== COUPONS MODAL ===== */}
      <Modal
        show={showCoupons}
        onHide={() => setShowCoupons(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Available Coupons</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="coupon-box">
            <h6>QUICK100</h6>
            <p>Flat ₹100 OFF on first booking</p>
            <Button
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText("QUICK100");
                setCopiedCode("QUICK100");
              }}
            >
              {copiedCode === "QUICK100" ? "Copied!" : "Copy Code"}
            </Button>
          </div>

          <div className="coupon-box">
            <h6>MOVIE20</h6>
            <p>Get 20% cashback on UPI payments</p>
            <Button
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText("MOVIE20");
                setCopiedCode("MOVIE20");
              }}
            >
              {copiedCode === "MOVIE20" ? "Copied!" : "Copy Code"}
            </Button>
          </div>

          <div className="coupon-box">
            <h6>BOGO50</h6>
            <p>Buy 1 Get 1 (Up to ₹150)</p>
            <Button
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText("BOGO50");
                setCopiedCode("BOGO50");
              }}
            >
              {copiedCode === "BOGO50" ? "Copied!" : "Copy Code"}
            </Button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            as={Link}
            to="/movies"
            onClick={() => setShowCoupons(false)}
          >
            Browse Movies
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ===== BOGO THEATRES MODAL ===== */}
      <Modal
        show={showTheatres}
        onHide={() => setShowTheatres(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Buy 1 Get 1 – Available Theatres</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {bogoTheatres.map((theatre, index) => (
            <div key={index} className="theatre-box">
              <h5>{theatre.name}</h5>

              <p className="theatre-movies">
                Movies available:
                <span>
                  {theatre.movies.join(", ")}
                </span>
              </p>

              <Button
                variant="danger"
                size="sm"
                as={Link}
                to="/movies"
                onClick={() => setShowTheatres(false)}
              >
                Book Now
              </Button>
            </div>
          ))}
        </Modal.Body>
      </Modal>



    </>
  );
}
