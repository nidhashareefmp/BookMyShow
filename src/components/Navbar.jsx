import { Navbar as RBNavbar, Nav, Button, Container } from "react-bootstrap";
import "../styles/Navbar.css";

export default function Navbar() {
    return (
        <RBNavbar expand="lg" className="floating-navbar" fixed="top">
            <Container fluid>
                {/* LEFT - BRAND */}
                <RBNavbar.Brand className="brand">
                    <span className="brand-q">Q</span>
                    <span className="brand-rest">uick</span>
                    <span className="brand-q">S</span>
                    <span className="brand-rest">how</span>



                </RBNavbar.Brand>

                <RBNavbar.Toggle aria-controls="main-navbar" />

                <RBNavbar.Collapse id="main-navbar">
                    {/* CENTER - LINKS */}
                    <Nav className="mx-auto nav-links">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/movies">Movies</Nav.Link>
                        <Nav.Link href="/theaters">Theaters</Nav.Link>
                        <Nav.Link href="/favourites">Favourites</Nav.Link>
                        <Nav.Link href="/releases">Releases</Nav.Link>
                    </Nav>

                    {/* RIGHT - LOGIN */}
                    <div className="login-btn-wrapper">
                        <Button className="login-btn">Login</Button>
                    </div>
                </RBNavbar.Collapse>
            </Container>
        </RBNavbar>
    );
}
