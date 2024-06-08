import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const AddUser = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const nav = useNavigate();

    const addUser = async () => {
        let responseData;
        let photo;

        if (!name || !email || !password || !role) {
            setError(true);
            setErrorMessage('Please fill in all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        await fetch(`https://ecommerce-1mc7.onrender.com/upload`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData
        })
        .then((res) => res.json())
        .then((data) => { responseData = data });

        photo = responseData.image_url;

        const token = JSON.parse(localStorage.getItem('tk'));
        let result = await fetch(`https://ecommerce-1mc7.onrender.com/add-user`, {
            method: "POST",
            body: JSON.stringify({ name, email, password, role, photo }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        result = await result.json();
        if (result) {
            nav('/user');
        }
        console.warn(result);
    };

    return (
        <Container>
            <h1>Add User</h1>
            {error && <Alert variant="danger">{errorMessage}</Alert>}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter user name" 
                        onChange={(e) => setName(e.target.value)} 
                        value={name} 
                        isInvalid={error && !name}
                    />
                    <Form.Control.Feedback type="invalid">
                        Enter a valid name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter user email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        isInvalid={error && !email}
                    />
                    <Form.Control.Feedback type="invalid">
                        Enter a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        isInvalid={error && !password}
                    />
                    <Form.Control.Feedback type="invalid">
                        Enter a valid password.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label><br />
                    <Form.Check 
                        type="radio" 
                        label="User" 
                        name="role" 
                        onChange={(e) => setRole(e.target.value)} 
                        value="user" 
                        inline 
                    />
                    <Form.Check 
                        type="radio" 
                        label="Admin" 
                        name="role" 
                        onChange={(e) => setRole(e.target.value)} 
                        value="admin" 
                        inline 
                    />
                    {error && !role && <div className="text-danger">Select a role.</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control 
                        type="file" 
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </Form.Group>

                <Button variant="primary" onClick={addUser}>Add User</Button>
            </Form>
        </Container>
    );
};

export { AddUser };
