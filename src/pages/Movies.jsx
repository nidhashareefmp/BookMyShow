import { Container, Row, Col, Card } from "react-bootstrap";
import { movies } from "../data/movies";
import "../styles/Homepage.css";

export default function Movies() {
  return (
    <Container>
      <h2>All Movies</h2>
      <Row>
        {movies.map((movie) => (
          <Col md={3} key={movie.id}>
            <Card>
              <Card.Img src={movie.image} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
