import { useState } from "react";
import {
  Navbar as RBNavbar,
  Nav,
  Button,
  Container,
  Form,
  FormControl,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <RBNavbar expand="lg" className="floating-navbar" fixed="top">
        <Container fluid>
          {/* LEFT - BRAND */}
          <RBNavbar.Brand as={Link} to="/" className="brand">
            <span className="brand-q">Q</span>
            <span className="brand-rest">uick</span>
            <span className="brand-q">S</span>
            <span className="brand-rest">how</span>
          </RBNavbar.Brand>

          <RBNavbar.Toggle aria-controls="main-navbar" />

          <RBNavbar.Collapse id="main-navbar">
            {/* CENTER - LINKS */}
            <Nav className="mx-auto nav-links">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
              <Nav.Link as={Link} to="/theaters">Theaters</Nav.Link>
              <Nav.Link as={Link} to="/releases">Releases</Nav.Link>
              <Nav.Link as={Link} to="/favourites">Favourites</Nav.Link>
            </Nav>

            {/* RIGHT - SEARCH + FAV + AUTH */}
            <div className="nav-right">
              {/* SEARCH */}
              <Form className="search-box">
                <FaSearch className="search-icon" />
                <FormControl
                  type="search"
                  placeholder="Search movies..."
                  className="search-input"
                />
              </Form>

              {/* FAVOURITES */}
              <Link to="/favourites" className="fav-icon">
                <FaHeart />
              </Link>

              {/* SIGN IN */}
              <Button
                variant="outline-light"
                className="signin-btn"
                onClick={() => setShowAuth(true)}
              >
                Sign In
              </Button>
            </div>
          </RBNavbar.Collapse>
        </Container>
      </RBNavbar>

      {/* 🔐 SIGN IN MODAL */}
      <Modal
        show={showAuth}
        onHide={() => setShowAuth(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>

        <Modal.Body className="auth-modal">
          <Button className="w-100 mb-3 google-btn">
            Continue with Google
          </Button>

          <Button className="w-100 mb-3 phone-btn">
            Continue with Phone Number
          </Button>

          <div className="text-center mt-3">
            <span>New here?</span>{" "}
            <Button variant="link" className="create-link p-0">
              Create Account
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
