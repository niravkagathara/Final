import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleDeleteClose = () => setShowDeleteModal(false);
    const handleEditClose = () => setShowEditModal(false);
    const handleShowDeleteModal = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };
    const handleShowEditModal = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/product/get`);
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const result = await response.json();
            setProducts(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id) => {
        const token = JSON.parse(localStorage.getItem('tk'));

        try {
            const response = await fetch(`http://localhost:5000/product/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete product");
            }
            getProducts();
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>
            <div className="Product-list">
                <div className="container">
                    <br />
                    <table>
                        <tbody>
                            <tr>
                                <td><h1 className="text-sm-end q">Product List</h1></td>
                                <td><Link to="/add" className="btn btn-primary btn-lg active mb-3" role="button" aria-pressed="true">Add Product</Link></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />

                    <Table responsive className="table">
                        <thead className="table-dark">
                            <tr>
                                <th>Index</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Company Name</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id}>
                                    <td onClick={() => handleShowEditModal(product)}>{index + 1}</td>
                                    <td onClick={() => handleShowEditModal(product)} style={{ height: '15rem', width: '20rem' }}>
                                        <img src={`http://localhost:5000/images/${product.imageA}`} alt={product.name} style={{ width: '100px' }} />
                                    </td>
                                    <td onClick={() => handleShowEditModal(product)} style={{ height: '6rem', width: '18rem' }}>{product.name}</td>
                                    <td onClick={() => handleShowEditModal(product)} style={{ height: '6rem', width: '15rem' }}>${product.price}</td>
                                    <td onClick={() => handleShowEditModal(product)} style={{ height: '10rem', width: '50rem' }}>{product.category}</td>
                                    <td onClick={() => handleShowEditModal(product)} style={{ height: '6rem', width: '10rem' }}>{product.companyname}</td>
                                    <td>
                                        {/* <i className='bx bxs-edit-alt' style={{ color: '#2140fb', cursor: 'pointer' }} onClick={() => handleShowEditModal(product)}></i> */}
                                        <i className='bx bxs-trash-alt' style={{ color: '#df0808', cursor: 'pointer' }} onClick={() => handleShowDeleteModal(product)}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {selectedProduct && (
                        <>
                            <Modal show={showDeleteModal} onHide={handleDeleteClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirm Delete Record</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleDeleteClose}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={() => deleteProduct(selectedProduct._id)}>
                                        Confirm
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={showEditModal} onHide={handleEditClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Product</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to edit this product: {selectedProduct.name}?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleEditClose}>
                                        Cancel
                                    </Button>
                                    <Link to={`/update/${selectedProduct._id}`} className="btn btn-primary" onClick={handleEditClose}>
                                        Edit
                                    </Link>
                                </Modal.Footer>
                            </Modal>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export { ProductList };
