import { Container, Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import "../styles/HomePage.css";

export default function HomePage() {
    return (
        <div className="hero-wrapper">
            <Navbar />

            <Container className="hero-content">
                <div className="hero-text">
                    <p className="studio">Marvel Studios</p>

                    <h1 className="hero-title">
                        Guardians <br /> of the Galaxy
                    </h1>

                    <div className="movie-info">
                        <span>Action | Adventure | Sci-Fi</span>
                        <span>2018</span>
                        <span>2h 8m</span>
                    </div>

                    <p className="description">
                        In a post-apocalyptic world where cities ride on wheels and consume
                        each other to survive, two people meet in London and try to stop a
                        conspiracy.
                    </p>

                    <Button className="explore-btn" as={Link} to="/Movies">
                        Explore Movies →
                    </Button>        </div>
            </Container>
        </div>
    );
}
