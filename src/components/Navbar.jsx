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
import emailjs from "@emailjs/browser";
import "../styles/Navbar.css";

export default function Navbar() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [showAuth, setShowAuth] = useState(false);
const [authMode, setAuthMode] = useState(null);
// "google" | "phone" | "login" | "signup"

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = (mode) => {
    let newErrors = {};

    if (mode !== "phone") {
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (mode === "phone") {
      if (!formData.phone) {
        newErrors.phone = "Phone number required";
      } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = "Invalid phone number";
      }
    }

    if (mode !== "signup" && !formData.name) {
      newErrors.name = "Name is required";
    }

    if (mode === "signup") {
      if (!formData.password) {
        newErrors.password = "Password required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Minimum 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendConfirmationEmail = async () => {
    return emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      { email: formData.email },
      "YOUR_PUBLIC_KEY"
    );
  };

  const handleLogin = async () => {
    if (!validate(authMode)) return;

    const loggedUser = {
      name: formData.name || formData.email || formData.phone,
    };

    if (authMode === "signup") {
      await sendConfirmationEmail();
      setSuccessMsg("Account created! Confirmation email sent 📩");
    } else {
      setSuccessMsg("Login successful 🎉");
    }

    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);

    setTimeout(() => {
      setShowAuth(false);
      setAuthMode(null);
      setFormData({ name: "", email: "", phone: "", password: "" });
      setErrors({});
      setSuccessMsg("");
    }, 1500);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <RBNavbar expand="lg" className="floating-navbar" fixed="top">
        <Container fluid>
          <RBNavbar.Brand as={Link} to="/" className="brand">
            <span className="brand-q">Q</span>
            <span className="brand-rest">uick</span>
            <span className="brand-q">S</span>
            <span className="brand-rest">how</span>
          </RBNavbar.Brand>

          <RBNavbar.Toggle aria-controls="main-navbar" />
          <RBNavbar.Collapse id="main-navbar">
            <Nav className="mx-auto nav-links">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
              <Nav.Link as={Link} to="/theaters">Theaters</Nav.Link>
              <Nav.Link as={Link} to="/latestreleases">Releases</Nav.Link>
              <Nav.Link as={Link} to="/favourites">Favourites</Nav.Link>
            </Nav>

            <div className="nav-right">
              <Form className="search-box">
                <FaSearch className="search-icon" />
                <FormControl
                  placeholder="Search movies..."
                  className="search-input"
                />
              </Form>

              <Link to="/favourites" className="fav-icon">
                <FaHeart />
              </Link>

              {user ? (
                <Button
                  variant="outline-light"
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  Logout
                </Button>

              ) : (
                <Button
                  variant="outline-light"
                  className="signin-btn"
                  onClick={() => setShowAuth(true)}
                >
                  Sign In
                </Button>
              )}
            </div>
          </RBNavbar.Collapse>
        </Container>
      </RBNavbar>

      {/* ================= AUTH MODAL ================= */}
      <Modal show={showAuth} onHide={() => setShowAuth(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>

        <Modal.Body className="auth-modal">
          {successMsg && (
            <div className="alert alert-success text-center">
              {successMsg}
            </div>
          )}

          {!authMode && (
            <>
             <Button
  className="w-100 mb-3 google-btn"
  onClick={() => setAuthMode("google")}
>
  Continue with Google
</Button>


             <Button
  className="w-100 mb-3 phone-btn"
  onClick={() => setAuthMode("phone")}
>
  Continue with Phone Number
</Button>


              <div className="text-center mt-3">
                <span>New here?</span>{" "}
               <Button
  variant="link"
  className="create-link p-0"
  onClick={() => setAuthMode("signup")}
>
  Create Account
</Button>

              </div>
            </>
          )}

          {authMode && (
            <Form>
              {authMode !== "signup" && (
                <>
                  <Form.Control
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    className="mb-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </>
              )}

              {authMode !== "phone" && (
                <>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    className="mb-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </>
              )}

              {authMode === "phone" && (
                <>
                  <Form.Control
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                    className="mb-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </>
              )}

              {authMode === "signup" && (
                <>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    className="mb-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </>
              )}

              <Button className="w-100 mt-3" onClick={handleLogin}>
                Continue
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={showLogoutConfirm}
        onHide={() => setShowLogoutConfirm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>

        <Modal.Body className="auth-modal text-center">
          <p>Are you sure you want to logout?</p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button
              variant="secondary"
              onClick={() => setShowLogoutConfirm(false)}
            >
              Cancel
            </Button>

            <Button
              className="phone-btn"
              onClick={() => {
                localStorage.removeItem("user");
                setUser(null);
                setShowLogoutConfirm(false);
              }}
            >
              Yes, Logout
            </Button>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
}
