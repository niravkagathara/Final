// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdateProduct = () => {
//     const [file, setFile] = useState(null);
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [category, setCategory] = useState('');
//     const [imageA, setImageA] = useState('');
//     const [companyname, setCompanyname] = useState('');
    
//     const { id } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchProductDetails();
//     }, []);

//     const fetchProductDetails = async () => {
//         const token = JSON.parse(localStorage.getItem('tk'));

//         try {
//             const response = await fetch(`https://e-commerce-api-peach.vercel.app/product/${id}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             const result = await response.json();
//             setName(result.name);
//             setPrice(result.price);
//             setCategory(result.category);
//             setCompanyname(result.companyname);
//             setImageA(result.imageA);
//         } catch (error) {
//             console.error("Error fetching product details:", error);
//         }
//     };

//     const handleUpdateProduct = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('file', file);

//             const uploadResponse = await fetch(`https://e-commerce-api-peach.vercel.app/upload/${imageA}`, {
//                 method: 'PUT',
//                 headers: {
//                     Accept: 'application/json',
//                 },
//                 body: formData
//             });
//             const responseData = await uploadResponse.json();
//             const newImageA = responseData.image_url;

//             const token = JSON.parse(localStorage.getItem('tk'));

//             const updateResponse = await fetch(`https://e-commerce-api-peach.vercel.app/product/${id}`, {
//                 method: 'PUT',
//                 body: JSON.stringify({ name, price, category, companyname, imageA: newImageA }),
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             const result = await updateResponse.json();

//             if (result) {
//                 navigate('/product');
//             } else {
//                 alert('Error updating product');
//             }
//         } catch (error) {
//             console.error("Error updating product:", error);
//         }
//     };

//     return (
//         <div className="container">
//             <h1 className="mt-4">Update Product</h1>
//             <form>
//                 <div className="form-group">
//                     <label htmlFor="name">Name</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="name"
//                         placeholder="Enter Product Name"
//                         onChange={(e) => setName(e.target.value)}
//                         value={name}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="price">Price</label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="price"
//                         placeholder="Enter Product Price"
//                         onChange={(e) => setPrice(e.target.value)}
//                         value={price}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="category">Description</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="category"
//                         placeholder="Enter Product Description"
//                         onChange={(e) => setCategory(e.target.value)}
//                         value={category}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="companyName">Company</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="companyName"
//                         placeholder="Enter Product Company"
//                         onChange={(e) => setCompanyname(e.target.value)}
//                         value={companyname}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="file">Image</label>
//                     <input
//                         type="file"
//                         className="form-control-file"
//                         id="file"
//                         onChange={(e) => setFile(e.target.files[0])}
//                     />
//                     {imageA && <img src={`https://e-commerce-api-peach.vercel.app/images/${imageA}`} alt="Product" className="img-thumbnail mt-2" style={{ width: '100px' }} />}
//                 </div>
//                 <button type="button" className="btn btn-primary mt-3" onClick={handleUpdateProduct}>Update Product</button>
//             </form>
//         </div>
//     );
// };

// export { UpdateProduct };
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

const UpdateProduct = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imageA, setImageA] = useState('');
    const [companyname, setCompanyname] = useState('');
    const [validated, setValidated] = useState(false); // State to track form validation

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        const token = JSON.parse(localStorage.getItem('tk'));

        try {
            const response = await fetch(`https://e-commerce-api-peach.vercel.app/product/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const result = await response.json();
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompanyname(result.companyname);
            setImageA(result.imageA);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const handleUpdateProduct = async (event) => {
        const form = event.currentTarget;
        event.preventDefault(); // Prevent default form submission behavior
        event.stopPropagation();

        if (form.checkValidity() === false) {
            setValidated(true); // Show validation feedback
            return;
        }

        try {
            // Your existing code for updating the product...
            const formData = new FormData();
                        formData.append('file', file);
            
                        const uploadResponse = await fetch(`https://e-commerce-api-peach.vercel.app/upload/${imageA}`, {
                            method: 'PUT',
                            headers: {
                                Accept: 'application/json',
                            },
                            body: formData
                        });
                        const responseData = await uploadResponse.json();
                        const newImageA = responseData.image_url;
            
                        const token = JSON.parse(localStorage.getItem('tk'));
            
                        const updateResponse = await fetch(`https://e-commerce-api-peach.vercel.app/product/${id}`, {
                            method: 'PUT',
                            body: JSON.stringify({ name, price, category, companyname, imageA: newImageA }),
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        });
                        const result = await updateResponse.json();
            
                        if (result) {
                            navigate('/product');
                        } else {
                            alert('Error updating product');
                        }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="mt-4">Update Product</h1>
            <Form noValidate validated={validated} onSubmit={handleUpdateProduct}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required // Required field
                    />
                    <Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Product Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required // Required field
                    />
                    <Form.Control.Feedback type="invalid">Please provide a price.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Product Description"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required // Required field
                    />
                    <Form.Control.Feedback type="invalid">Please provide a description.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="companyName">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Product Company"
                        value={companyname}
                        onChange={(e) => setCompanyname(e.target.value)}
                        required // Required field
                    />
                    <Form.Control.Feedback type="invalid">Please provide a company name.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="file">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        required // Required field
                    />
                    {imageA && <img src={`https://e-commerce-api-peach.vercel.app/images/${imageA}`} alt="Product" className="img-thumbnail mt-2" style={{ width: '100px' }} />}
                    <Form.Control.Feedback type="invalid">Please provide an image.</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Update Product</Button>
            </Form>
        </div>
    );
};

export { UpdateProduct };
