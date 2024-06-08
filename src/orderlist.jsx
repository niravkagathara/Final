import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Orderlist() {
    const [products, setProducts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleDeleteClose = () => setShowDeleteModal(false);
    const handleShowDeleteModal = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const token = JSON.parse(localStorage.getItem('tk'));
        try {
            const response = await fetch(`https://ecommerce-1mc7.onrender.com/order/get`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            setProducts(result);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const deleteProduct = async (id) => {
        const token = JSON.parse(localStorage.getItem('tk'));
        try {
            const response = await fetch(`https://ecommerce-1mc7.onrender.com/order/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (result) {
                getProducts();
                setShowDeleteModal(false);
            } else {
                alert('Error deleting order');
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    return (
        <div>
            <div className="Product-list">
                <div className="container">
                    <br />
                    <table>
                        <tbody>
                            <tr>
                                <td><h1 className="text-sm-end q">Order List</h1></td>
                                <td><Link to="/addorder" className="btn btn-primary btn-lg active mb-3" role="button" aria-pressed="true">Add Order</Link></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />

                    <Table responsive className="table">
                        <thead className="table-dark">
                            <tr>
                                <th>Index</th>
                                <th>Customer Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Total Amount</th>
                                <th>User ID</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td style={{ height: '6rem', width: '10rem' }}>{product.customerName}</td>
                                    <td style={{ height: '6rem', width: '22rem' }}>{product.address}</td>
                                    <td style={{ height: '6rem', width: '18rem' }}>{product.email}</td>
                                    <td style={{ height: '6rem', width: '12rem' }}>{product.phoneNumber}</td>
                                    <td style={{ height: '6rem', width: '10rem' }}>${product.totalAmount}</td>
                                    <td>{product.userId}</td>
                                    <td >
                                        <i  className='bx bxs-trash-alt' style={{ color: '#df0808' }} onClick={() => handleShowDeleteModal(product)}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {selectedProduct && (
                        <Modal show={showDeleteModal} onHide={handleDeleteClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Delete Record</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete this order?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleDeleteClose}>Cancel</Button>
                                <Button variant="danger" onClick={() => deleteProduct(selectedProduct._id)}>Confirm</Button>
                            </Modal.Footer>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Orderlist;
