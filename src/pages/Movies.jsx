import { Container, Row, Col, Card, Button } from "react-bootstrap";
import moviesData from "../data/moviesdata";
import "../styles/Homepage.css";

export default function Movies() {

  const addToFavorites = (movie) => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const isAlreadyFavorited = existingFavorites.some((fav) => fav.id === movie.id);

    if (!isAlreadyFavorited) {
      const updatedFavorites = [...existingFavorites, movie];
      // 3. Save back to LocalStorage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert(`${movie.title} added to favorites!`);
    } else {
      alert("This movie is already in your favorites.");
    }
  };

  const handleBooking = (movie) => {
    navigate("/seats", { state: { movie: movie } });
  };


  return (
    <Container className="mt-4">
      <h2 className="mb-4">All Movies</h2>
      <Row>
        {moviesData.map((movie) => (
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
                  </Button>                  <Button
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