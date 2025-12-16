


import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import moviesData from "../data/moviesdata";
import "../styles/HomePage.css";
import { StrangerthingsImg } from "../assets/images";

export default function HomePage() {
  const latestMovies = moviesData.slice(0, 4);

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
    </>
  );
}
