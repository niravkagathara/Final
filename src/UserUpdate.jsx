import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Userupdate = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);

    const { id, imageA } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        const token = JSON.parse(localStorage.getItem('tk'));
        try {
            let result = await fetch(`https://e-commerce-api-peach.vercel.app/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            result = await result.json();
            setName(result.name);
            setEmail(result.email);
            setPassword(result.password);
            setRole(result.role);
            setPhoto(result.photo);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const updateProduct = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);
        let responseData;
        let photoUrl;

        const formData = new FormData();
        formData.append('file', file);
        try {
            const uploadResponse = await fetch(`https://e-commerce-api-peach.vercel.app/upload/${imageA}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                },
                body: formData
            });
            responseData = await uploadResponse.json();
            photoUrl = responseData.image_url;
        } catch (error) {
            setError('Error uploading image');
            return;
        }

        const token = JSON.parse(localStorage.getItem('tk'));
        try {
            let result = await fetch(`https://e-commerce-api-peach.vercel.app/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ name, email, password, role, photo: photoUrl }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            result = await result.json();
            if (result) {
                navigate('/user');
            }
        } catch (error) {
            setError('Error updating user');
        }
    };

    return (
        <div className="container">
            <h1>Update User</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form noValidate validated={validated} onSubmit={updateProduct}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter user name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter user email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter user password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="User"
                            name="role"
                            type="radio"
                            value="user"
                            checked={role === 'user'}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        />
                        <Form.Check
                            inline
                            label="Admin"
                            name="role"
                            type="radio"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        />
                    </div>
                    <Form.Control.Feedback type="invalid">Please select a role.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formFile">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                    <Form.Control.Feedback type="invalid">Please upload an image.</Form.Control.Feedback>
                    {photo && <img src={`https://e-commerce-api-peach.vercel.app/images/${photo}`} alt="Profile" style={{ width: '100px', marginTop: '10px' }} />}
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">Update User</Button>
            </Form>
        </div>
    );
};

export { Userupdate };
