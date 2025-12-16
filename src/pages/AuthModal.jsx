import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function AuthModal({ show, onHide, onLogin }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const loginWithEmail = () => {
    if (!email || !name) return alert("Fill all fields");

    const user = {
      name,
      email,
      provider: "email",
    };

    localStorage.setItem("user", JSON.stringify(user));
    onLogin(user);
    sendLoginEmail(user);
    onHide();
  };

  const loginWithGoogle = () => {
    const user = {
      name: "Google User",
      email: "googleuser@gmail.com",
      provider: "google",
    };

    localStorage.setItem("user", JSON.stringify(user));
    onLogin(user);
    sendLoginEmail(user);
    onHide();
  };

  const sendLoginEmail = (user) => {
    emailjs.send(
      "YOUR_SERVICE_ID",
      "LOGIN_TEMPLATE_ID",
      {
        user_name: user.name,
        user_email: user.email,
      },
      "YOUR_PUBLIC_KEY"
    );
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Button className="w-100 mb-3" onClick={loginWithGoogle}>
          Continue with Google
        </Button>

        <hr />

        <Form>
          <Form.Control
            placeholder="Name"
            className="mb-2"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            placeholder="Email"
            type="email"
            className="mb-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="w-100" onClick={loginWithEmail}>
            Continue with Email
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
