import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For seat selection link

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Load favorites from storage on mount
  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs);
  }, []);


  const handleBooking = (movie) => {
  navigate("/seats", { state: { movie: movie } });
};

  const removeFavorite = (id) => {
    const updated = favorites.filter(movie => movie.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">My Favorite Movies</h2>
      {favorites.length === 0 ? (
        <div className="text-center mt-5">
          <h4>Your favorites list is empty.</h4>
          <Button variant="primary" onClick={() => navigate("/")}>Go to Movies</Button>
        </div>
      ) : (
        <Row>
          {favorites.map((movie) => (
            <Col md={3} key={movie.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={movie.image} alt={movie.title} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text className="text-muted small">
                    {movie.description.substring(0, 60)}...
                  </Card.Text>
                  
                  <div className="mt-auto">
                    {/* Link to Seat Selection */}
                    <Button 
  variant="primary" 
  className="w-100 mb-2"
  onClick={() => handleBooking(movie)}
>
  Book Now
</Button>

                    {/* Option to remove from favorites */}
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      className="w-100"
                      onClick={() => removeFavorite(movie.id)}
                    >
                      Remove from List
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}