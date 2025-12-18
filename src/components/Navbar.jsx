import { useState } from "react";
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

import { FaHeart, FaSearch, FaUserPlus, FaSignOutAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [profileImg, setProfileImg] = useState(null);


  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

 const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    // RESET OTP IF PHONE NUMBER CHANGES
    if (name === "phone") {
      setOtp("");
      setOtpSent(false);
    }
  };

  const validate = () => {
    let newErrors = {};

    // EMAIL LOGIN
    if (authMode === "email") {
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
        newErrors.email = "Only @gmail.com emails are allowed";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    // PHONE LOGIN
    if (authMode === "phone") {
      if (!formData.name) newErrors.name = "Name is required";

      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = "Enter a valid 10-digit Indian number";
      }

      if (!otpSent) newErrors.otp = "Please verify OTP";

      if (!formData.password) newErrors.password = "Password is required";

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleLogin = () => {
    if (!validate()) return;

    // EMAIL LOGIN → EMAILJS
    if (authMode === "email") {
      emailjs
        .send(
          "service_l14kjlo",
          "template_8e5wfwm",
          {
            email: formData.email,
            message: "User logged in successfully",
          },
          "6dstiV_-yu9MD2ep3"
        )
        .then(
          () => console.log("Email sent"),
          (error) => console.error("EmailJS error", error)
        );

      const loggedUser = {
        name: formData.email.split("@")[0],
        email: formData.email,
      };

      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
    }

    // PHONE LOGIN
    if (authMode === "phone") {
      const loggedUser = {
        name: formData.name,
        phone: formData.phone,
        image: profileImg,
      };

      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
    }

    setShowAuth(false);
    setAuthMode(null);
    setOtpSent(false);
  };


  const sendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setErrors({ phone: "Enter a valid 10-digit phone number" });
      return;
    }

    setOtpSent(true);
    alert("OTP sent: 123456"); 
  };



  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowLogoutConfirm(false);
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
              <Nav.Link as={Link} to="/theaters">Theaters</Nav.Link> {/* Restored link */}
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
                    <img
                      src={"https://via.placeholder.com/40"}
                      alt="profile"
                      className="nav-profile-img"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="profile-dropdown-menu">
                    <Dropdown.Header className="text-white">{user.name}</Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item className="text-danger" onClick={() => setShowLogoutConfirm(true)}>
                      <FaSignOutAlt className="me-2" /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button variant="outline-light" className="signin-btn" onClick={() => setShowAuth(true)}>
                  Sign In
                </Button>
              )}
            </div>
          </RBNavbar.Collapse>
        </Container>
      </RBNavbar>

      {/* AUTH MODAL */}
      <Modal show={showAuth} onHide={() => { setShowAuth(false); setAuthMode(null); }} centered>
        <Modal.Header className="auth-header border-0 d-flex justify-content-between align-items-center">
          <Modal.Title className="text-white">
            {authMode === "email"
              ? "Sign In with Email"
              : authMode === "phone"
                ? "Sign In with Phone"
                : "Sign In"}
          </Modal.Title>

          {/* EXIT BUTTON */}
          <Button
            variant="link"
            className="text-white fs-4 text-decoration-none"
            onClick={() => {
              setShowAuth(false);
              setAuthMode(null);
              setOtpSent(false);
              setErrors({});
            }}
          >
            &times;
          </Button>
        </Modal.Header>


        <Modal.Body className="auth-modal bg-dark text-white p-4">
          {!authMode ? (
            <div className="d-grid gap-3">
              <Button className="email-btn py-2" onClick={() => setAuthMode("email")}>
                <FaEnvelope className="me-2" /> Continue with Email
              </Button>
              <Button className="phone-btn py-2" onClick={() => setAuthMode("phone")}>
                <FaPhoneAlt className="me-2" /> Continue with Phone
              </Button>
              <div className="text-center mt-3">
                <small>New here? </small>
                <Button variant="link" className="create-link p-0 fw-bold" onClick={() => setAuthMode("signup")}>
                  Create Account
                </Button>
              </div>
            </div>
          ) : (
            <Form>

              {/* ========== EMAIL LOGIN ========== */}
              {authMode === "email" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      className="bg-transparent text-white border-secondary"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      className="bg-transparent text-white border-secondary"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                      className="bg-transparent text-white border-secondary"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                </>
              )}

              {/* ========== PHONE LOGIN ========== */}
              {authMode === "phone" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Full Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      className="bg-transparent text-white border-secondary"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Phone Number</Form.Label>
                    <Form.Control
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                      className="bg-transparent text-white border-secondary"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {!otpSent ? (
                    <Button
                      variant="outline-info"
                      className="w-100 mb-3"
                      onClick={sendOtp}
                    >
                      Send OTP
                    </Button>
                  ) : (
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">OTP</Form.Label>
                      <Form.Control
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        isInvalid={!!errors.otp}
                        className="bg-transparent text-white border-secondary"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.otp}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      className="bg-transparent text-white border-secondary"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                      className="bg-transparent text-white border-secondary"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Profile Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setProfileImg(URL.createObjectURL(e.target.files[0]))
                      }
                      className="bg-transparent text-white border-secondary"
                    />
                  </Form.Group>
                </>
              )}

              {/* SUBMIT */}
              <Button className="w-100 mt-2 btn-info" onClick={handleLogin}>
                Continue
              </Button>

              {/* BACK */}
              <div className="text-center mt-3">
                <Button
                  variant="link"
                  className="text-muted text-decoration-none p-0"
                  onClick={() => {
                    setAuthMode(null);
                    setOtpSent(false);
                    setErrors({});
                  }}
                >
                  ← Back to options
                </Button>
              </div>

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
            <Button variant="danger" onClick={handleLogout}>Yes, Logout</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}