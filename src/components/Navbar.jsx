import { useState, useEffect } from "react";
import {
  Navbar as RBNavbar,
  Nav,
  Button,
  Container,
  Form,
  FormControl,
  Modal,
  Dropdown
} from "react-bootstrap";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { FaHeart, FaSearch, FaSignOutAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState(null); 
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
useEffect(() => {
  const openAuthModal = () => {
    setShowAuth(true);
  };

  window.addEventListener("open-auth-modal", openAuthModal);

  return () => {
    window.removeEventListener("open-auth-modal", openAuthModal);
  };
}, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "phone") {
      setOtp("");
      setOtpSent(false);
    }
  };

  const sendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setErrors({ phone: "Enter a valid 10-digit phone number" });
      return;
    }
    setOtpSent(true);
    alert("OTP sent: 123456"); 
  };

  const validate = () => {
    let newErrors = {};

    if (authMode === "signup") {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
        newErrors.email = "Only @gmail.com is allowed";
      }
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (authMode === "email") {
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
    }

    if (authMode === "phone") {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!otpSent) newErrors.otp = "Please verify OTP";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleLogin = () => {
  if (!validate()) return;

  const loggedUser = {
    name: formData.name || formData.email.split("@")[0],
    email: formData.email,
    phone: formData.phone,
  };

  localStorage.setItem("user", JSON.stringify(loggedUser));
  setUser(loggedUser);
  setShowAuth(false);
  setAuthMode(null);

  // 🔔 IMPORTANT: notify other pages
  window.dispatchEvent(new Event("user-logged-in"));
};


  return (
    <>
      <RBNavbar expand="lg" className="floating-navbar" fixed="top">
        <Container fluid>
          <RBNavbar.Brand as={Link} to="/" className="brand">
            <span className="brand-q">Q</span>uick<span className="brand-q">S</span>how
          </RBNavbar.Brand>
          <RBNavbar.Toggle aria-controls="main-navbar" />
          <RBNavbar.Collapse id="main-navbar">
            <Nav className="mx-auto nav-links">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
              <Nav.Link as={Link} to="/latestreleases">Releases</Nav.Link>
            </Nav>

            <div className="nav-right">
              <Form className="search-box">
                <FaSearch className="search-icon" />
                <FormControl placeholder="Search movies..." className="search-input" />
              </Form>
              <Link to="/favourites" className="fav-icon"><FaHeart /></Link>
              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="transparent" className="p-0 border-0 no-caret">
                    <img src={"https://via.placeholder.com/40"} alt="profile" className="nav-profile-img" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="profile-dropdown-menu">
                    <Dropdown.Header>{user.name}</Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item className="text-danger" onClick={() => setShowLogoutConfirm(true)}>
                      <FaSignOutAlt className="me-2" /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button variant="outline-light" className="signin-btn" onClick={() => setShowAuth(true)}>Sign In</Button>
              )}
            </div>
          </RBNavbar.Collapse>
        </Container>
      </RBNavbar>

      {/* AUTH MODAL */}
      <Modal show={showAuth} onHide={() => setShowAuth(false)} centered contentClassName="modal-content-custom">
        <div className="custom-modal-header d-flex justify-content-between align-items-center p-3">
          {authMode ? (
            <button className="btn-modal-back" onClick={() => { setAuthMode(null); setErrors({}); setOtpSent(false); }}>← Back</button>
          ) : <span className="header2">Sign In</span>}
          <button className="btn-exit-red" onClick={() => setShowAuth(false)}>&times;</button>
        </div>

        <Modal.Body className="auth-modal bg-dark text-white p-4 pt-0">
          {!authMode ? (
            <div className="d-grid gap-3">
              <Button className="email-btn py-2" onClick={() => setAuthMode("email")}><FaEnvelope className="me-2" /> Continue with Email</Button>
              <Button className="phone-btn py-2" onClick={() => setAuthMode("phone")}><FaPhoneAlt className="me-2" /> Continue with Phone</Button>
              <div className="text-center mt-3">
                <small>New here? </small>
                <Button variant="link" className="create-link p-0 fw-bold" onClick={() => setAuthMode("signup")}>Create Account</Button>
              </div>
            </div>
          ) : (
            <Form noValidate>
              {/* SIGNUP MODE */}
              {authMode === "signup" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control name="phone" value={formData.phone} onChange={handleChange} isInvalid={!!errors.phone} />
                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} isInvalid={!!errors.password} />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" onChange={handleChange} isInvalid={!!errors.confirmPassword} />
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>
                </>
              )}

              {/* EMAIL LOGIN MODE */}
              {authMode === "email" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} isInvalid={!!errors.password} />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>
                </>
              )}

              {/* PHONE LOGIN MODE (Your specific OTP format) */}
              {authMode === "phone" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control name="phone" value={formData.phone} onChange={handleChange} isInvalid={!!errors.phone} />
                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                  </Form.Group>

                  {!otpSent ? (
                    <Button variant="outline-info" className="w-100 mb-3" onClick={sendOtp}>Send OTP</Button>
                  ) : (
                    <Form.Group className="mb-3">
                      <Form.Label>OTP</Form.Label>
                      <Form.Control value={otp} onChange={(e) => setOtp(e.target.value)} isInvalid={!!errors.otp} />
                      <Form.Control.Feedback type="invalid">{errors.otp}</Form.Control.Feedback>
                    </Form.Group>
                  )}
                </>
              )}

              <Button className="w-100 mt-2 btn-info" onClick={handleLogin}>Continue</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* LOGOUT CONFIRMATION */}
      <Modal show={showLogoutConfirm} onHide={() => setShowLogoutConfirm(false)} centered>
        <Modal.Body className="bg-dark text-white text-center p-4 rounded">
          <h5>Are you sure you want to logout?</h5>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button variant="secondary" onClick={() => setShowLogoutConfirm(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => { localStorage.removeItem("user"); setUser(null); setShowLogoutConfirm(false); }}>Yes, Logout</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}