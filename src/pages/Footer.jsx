import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="quickshow-footer">
      <Container>
        <Row className="footer-top">
          {/* Brand / About */}
          <Col md={4} className="footer-section">
            <h4>🎬 QuickShow</h4>
            <p>
              QuickShow lets you book movie tickets effortlessly. Choose your
              favourite movies, theatres, seats, and enjoy a smooth cinema
              experience anytime, anywhere.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="footer-section">
            <h5>Quick Links</h5>
            <ul>
              <li>Now Showing</li>
              <li>Upcoming Movies</li>
              <li>Theatres</li>
              <li>Offers & Discounts</li>
            </ul>
          </Col>

          {/* Support */}
          <Col md={4} className="footer-section">
            <h5>Support</h5>
            <p>Email us anytime:</p>
            <a href="mailto:support@quickshow.com" className="footer-email">
              support@quickshow.com
            </a>

            <div className="footer-socials">
              <a href="mailto:support@quickshow.com" aria-label="Email">
                <FaEnvelope />
              </a>
              <a
                href="https://www.instagram.com/quickshow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/@quickshow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <Row className="footer-bottom">
          <Col>
            <p>
              © {new Date().getFullYear()} QuickShow. Designed for movie lovers 🍿
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
