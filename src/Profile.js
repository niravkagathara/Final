import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Alert, Container } from 'react-bootstrap';

const Profile = () => {
    const nav = useNavigate();
    const auth = JSON.parse(localStorage.getItem('author'));
    const ii = JSON.parse(localStorage.getItem('id'));

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const token = JSON.parse(localStorage.getItem('tk'));
        try {
            const response = await fetch(`https://ecommerce-1mc7.onrender.com/${ii}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            await response.json();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const logout = () => {
        localStorage.clear();
        nav('/signup');
    };

    return (
        <Container className="mt-4">
            <Card className="text-center">
                <Card.Body>
                    {auth ? (
                        <>
                            <Card.Img variant="top" src={`https://ecommerce-1mc7.onrender.com/images/${auth.photo}`} style={{ width: '100px' }} />
                            <Card.Title>{`Username: ${auth.name}`}</Card.Title>
                            <Card.Text>{`Email: ${auth.email}`}</Card.Text>
                            <Button variant="secondary" onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Alert variant="warning">
                                Please login to access your profile.
                            </Alert>
                            <Link to="/login" className="btn btn-secondary btn-lg active mb-3" role="button" aria-pressed="true">Login</Link>
                        </>
                    )}
                </Card.Body>
                <Card.Footer className="text-muted">
                    <div className="social-links mt-2">
                        <a href="#" className="text-reset me-3"><i className="bi bi-twitter" /></a>
                        <a href="#" className="text-reset me-3"><i className="bi bi-facebook" /></a>
                        <a href="#" className="text-reset me-3"><i className="bi bi-instagram" /></a>
                        <a href="#" className="text-reset me-3"><i className="bi bi-linkedin" /></a>
                    </div>
                </Card.Footer>
            </Card>
        </Container>
    );
}

export { Profile };
