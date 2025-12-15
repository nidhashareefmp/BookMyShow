// import { Container, Button, Card, Row, Col, Badge } from "react-bootstrap";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";

// import "../styles/HomePage.css";
// import { AvengersImg, SpidermanImg, JawanImg, LeoImg } from "../assets/images";


// export default function HomePage() {
//     return (
//         <>
//             {/* HERO SECTION */}
//             <div className="hero-wrapper">
//                 <Navbar />

//                 <Container className="hero-content">
//                     <div className="hero-text">
//                         <p className="studio">Marvel Studios</p>

//                         <h1 className="hero-title">
//                             Guardians <br /> of the Galaxy
//                         </h1>

//                         <div className="movie-info">
//                             <span>Action | Adventure | Sci-Fi</span>
//                             <span>2018</span>
//                             <span>2h 8m</span>
//                         </div>

//                         <p className="description">
//                             In a post-apocalyptic world where cities ride on wheels and consume
//                             each other to survive, two people meet in London and try to stop a
//                             conspiracy.
//                         </p>

//                         <Button className="explore-btn" as={Link} to="/Movies">
//                             Explore Movies →
//                         </Button>
//                     </div>
//                 </Container>
//             </div>
//             {/* LATEST RELEASE – MOVIE BOOKING */}
//             <Container className="latest-release-section">
//                 <h2 className="section-title text-start">Latest Release</h2>

//                 <Row className="g-4">
//                     <Col md={3} sm={6}>
//                         <Card className="booking-card">
//                             <Card.Img
//                                 variant="top"
//                                 src={AvengersImg}
//                                 alt="Avengers: Endgame"
//                             />
//                             <Card.Body>
//                                 <Card.Title>Avengers: Endgame</Card.Title>

//                                 <div className="movie-tags">
//                                     <Badge bg="danger">2D</Badge>
//                                     <Badge bg="secondary">English</Badge>
//                                 </div>

//                                 <Button
//                                     variant="danger"
//                                     className="w-100 mt-3"
//                                     as={Link}
//                                     to="/seats"
//                                     state={{ movie: "Avengers: Endgame" }}
//                                 >
//                                     Book Now
//                                 </Button>


//                             </Card.Body>
//                         </Card>
//                     </Col>


//                     <Col md={3} sm={6}>
//                         <Card className="booking-card">
//                             <Card.Img
//                                 variant="top"
//                                 src={SpidermanImg}
//                                 alt="Spider-Man"
//                             />
//                             <Card.Body>
//                                 <Card.Title>Spider-Man</Card.Title>

//                                 <div className="movie-tags">
//                                     <Badge bg="danger">IMAX</Badge>
//                                     <Badge bg="secondary">English</Badge>
//                                 </div>

//                                 <Button
//                                     variant="danger"
//                                     className="w-100 mt-3"
//                                     as={Link}
//                                     to="/seats"
//                                     state={{ movie: "Spider-Man" }}
//                                 >
//                                     Book Now
//                                 </Button>



//                             </Card.Body>
//                         </Card>
//                     </Col>


//                     <Col md={3} sm={6}>
//                         <Card className="booking-card">
//                             <Card.Img
//                                 variant="top"
//                                 src={JawanImg}
//                                 alt="Jawan"
//                             />
//                             <Card.Body>
//                                 <Card.Title>Jawan</Card.Title>

//                                 <div className="movie-tags">
//                                     <Badge bg="danger">2D</Badge>
//                                     <Badge bg="secondary">Hindi</Badge>
//                                 </div>

//                                 <Button
//                                     variant="danger"
//                                     className="w-100 mt-3"
//                                     as={Link}
//                                     to="/seats"
//                                     state={{ movie: "Jawan" }}
//                                 >
//                                     Book Now
//                                 </Button>



//                             </Card.Body>
//                         </Card>
//                     </Col>


//                     <Col md={3} sm={6}>
//                         <Card className="booking-card">
//                             <Card.Img
//                                 variant="top"
//                                 src={LeoImg}
//                                 alt="Leo"
//                             />
//                             <Card.Body>
//                                 <Card.Title>Leo</Card.Title>

//                                 <div className="movie-tags">
//                                     <Badge bg="danger">2D</Badge>
//                                     <Badge bg="secondary">Tamil</Badge>
//                                 </div>

//                                 <Button
//                                     variant="danger"
//                                     className="w-100 mt-3"
//                                     as={Link}
//                                     to="/seats"
//                                     state={{ movie: "Leo" }}
//                                 >
//                                     Book Now
//                                 </Button>



//                             </Card.Body>
//                         </Card>
//                     </Col>

//                 </Row>
//             </Container>

//         </>
//     );
// }




import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { movies } from "./Movies";

export default function HomePage() {
  // only show first 4 or latest 20
  const latestMovies = movies.slice(0, 4);

  return (
    <Container className="latest-release-section">
      <h2 className="section-title text-start">Latest Release</h2>

      <Row className="g-4">
        {latestMovies.map((movie) => (
          <Col md={3} sm={6} key={movie.id}>
            <Card className="booking-card">
              <Card.Img variant="top" src={movie.image} alt={movie.title} />
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
  );
}
