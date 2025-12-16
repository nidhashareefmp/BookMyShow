import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moviesData from "../data/moviesdata";
import "../styles/Homepage.css";
import "../styles/LatestReleases.css";

export default function LatestReleases() {
    const navigate = useNavigate();

    // 1. Filter the movies here
    const latestMovies = moviesData.filter(movie => movie.isLatest === true);

    const addToFavorites = (movie) => {
        const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isAlreadyFavorited = existingFavorites.some((fav) => fav.id === movie.id);

        if (!isAlreadyFavorited) {
            const updatedFavorites = [...existingFavorites, movie];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            alert(`${movie.title} added to favorites!`);
        } else {
            alert("Already in favorites!");
        }
    };

    const handleBooking = (movie) => {
        navigate("/seats", { state: { movie } });
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-danger">🔥 Latest Releases</h2>
            <Row>
                {latestMovies.length > 0 ? (
                    latestMovies.map((movie) => (
                        <Col md={3} key={movie.id} className="mb-4">
                            {/* The 'movie' variable ONLY exists inside this map block */}
                            <Card className="movie-card h-100 shadow-sm border-0">
                                <div className="badge-latest">NEW</div>
                                <Card.Img variant="top" src={movie.image} alt={movie.title} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text className="text-muted small">
                                        {movie.description?.substring(0, 80)}...
                                    </Card.Text>

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
                                            ❤️ Favorite
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p className="text-center mt-5">No latest releases found. Make sure 'isLatest: true' is added to your moviesdata.js!</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
}