import { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function AdminDashboard() {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
        theatres: "",
        isLatest: false
    });
    const [alert, setAlert] = useState(null);

    const API_URL = "http://localhost:3000/movies";

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
            showAlert("danger", "Failed to fetch movies.");
        }
    };

    const showAlert = (variant, message) => {
        setAlert({ variant, message });
        setTimeout(() => setAlert(null), 3000);
    };

    const handleShow = (movie = null) => {
        if (movie) {
            setEditingMovie(movie);
            setFormData({
                title: movie.title,
                image: movie.image,
                description: movie.description,
                theatres: movie.theatres.join(", "),
                isLatest: movie.isLatest || false
            });
        } else {
            setEditingMovie(null);
            setFormData({
                title: "",
                image: "",
                description: "",
                theatres: "",
                isLatest: false
            });
        }
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data
        const movieData = {
            ...formData,
            theatres: formData.theatres.split(",").map(t => t.trim()).filter(t => t)
        };

        try {
            if (editingMovie) {
                // Edit
                await fetch(`${API_URL}/${editingMovie.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...movieData, id: editingMovie.id })
                });
                showAlert("success", "Movie updated successfully!");
            } else {
                // Add
                // Generate a simple ID if server doesn't auto-generate (json-server usually does if string, but let's let it handle or fallback)
                await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(movieData)
                });
                showAlert("success", "Movie added successfully!");
            }
            fetchMovies();
            handleClose();
        } catch (error) {
            console.error("Error saving movie:", error);
            showAlert("danger", "Failed to save movie.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            try {
                await fetch(`${API_URL}/${id}`, {
                    method: "DELETE"
                });
                showAlert("success", "Movie deleted successfully!");
                fetchMovies();
            } catch (error) {
                console.error("Error deleting movie:", error);
                showAlert("danger", "Failed to delete movie.");
            }
        }
    };

    return (
        <Container className="py-5" style={{ marginTop: "80px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white">Admin Dashboard 🎬</h2>
                <Button variant="success" onClick={() => handleShow()}>
                    <FaPlus className="me-2" /> Add Movie
                </Button>
            </div>

            {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}

            <div className="table-responsive">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Theatres</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(movie => (
                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>
                                    <img src={movie.image} alt={movie.title} style={{ width: "50px", height: "75px", objectFit: "cover" }} />
                                </td>
                                <td>{movie.title} {movie.isLatest && <span className="badge bg-warning text-dark">Latest</span>}</td>
                                <td>{Array.isArray(movie.theatres) ? movie.theatres.join(", ") : movie.theatres}</td>
                                <td>
                                    <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleShow(movie)}>
                                        <FaEdit />
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(movie.id)}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editingMovie ? "Edit Movie" : "Add Movie"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Movie Title</Form.Label>
                            <Form.Control
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Theatres (comma separated)</Form.Label>
                            <Form.Control
                                name="theatres"
                                value={formData.theatres}
                                onChange={handleChange}
                                placeholder="PVR, INOX, IMAX"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Is Latest Release?"
                                name="isLatest"
                                checked={formData.isLatest}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            {editingMovie ? "Update Movie" : "Add Movie"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
