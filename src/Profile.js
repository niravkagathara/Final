import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


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
            const response = await fetch(`http://localhost:5000/${ii}`, {
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
    }

    return (
        <>
            <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    {
                        auth ? <>
                            <img src={`https://ecommerce-1mc7.onrender.com/images/${auth.photo}`} style={{ width: '100px' }} />

                            <h2> username: {auth.name}</h2>
                            <h3>email: {auth.email}</h3>
                            <Link className="btn  btn-secondary" onClick={logout} to="/signup">Logout</Link>
                        </> : <>
                            <h1>please login</h1>
                            <Link to="/login" className="btn btn-secondary btn-lg active mb-3" role="button" aria-pressed="true">login</Link>
                        </>
                    }

                    <div className="social-links mt-2">
                        <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
                        <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                        <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
                        <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
                    </div>
                </div>
            </div>

        </>
    )
}

export { Profile };
