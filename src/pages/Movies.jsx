import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Movies.css";
import "../styles/Homepage.css";

export default function Movies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const handleBooking = (movie) => {
    navigate("/seats", { state: { movie: movie } });
  };

  const addToFavorites = (movie) => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorited = existingFavorites.some((fav) => fav.id === movie.id);

    if (!isAlreadyFavorited) {
      const updatedFavorites = [...existingFavorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert(`${movie.title} added to favorites!`);
    } else {
      alert("This movie is already in your favorites.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="all-movies">All Movies</h2>
      <Row>
        {movies.map((movie) => (
          <Col md={3} key={movie.id} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={movie.image} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>

                <div className="mt-auto">
                  <Button
                    variant="primary"
                    className="w-100 mb-2"
                    onClick={() => handleBooking(movie)}
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="w-100"
                    onClick={() => addToFavorites(movie)}
                  >
                    Add to Favorites
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}