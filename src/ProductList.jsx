import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [edit, setedit] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); }
    const handleedit = () => setedit(false);
    const showedit = () => {
        setedit(true);
    }
    const handleo = async (e) => {
        setShow(false);
        deleteProduct(e);
    }
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetch(`https://ecommerce-1mc7.onrender.com/product/get`);
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
            const response = await fetch(`https://ecommerce-1mc7.onrender.com/product/${id}`, {
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
            setShow(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>
            <div className="Product-list">
                <div className="container">
                    <br></br>
                    <table>
                        <tbody>
                            <tr>
                                <td> <h1 className="text-sm-end q">Product List</h1></td>
                                <td> <Link to="/add" className="btn btn-primary btn-lg active mb-3" role="button" aria-pressed="true">Add Product</Link></td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>

                    <Table responsive className="table">
                        <thead className="table-dark">
                            <tr>
                                <th>Index</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Descripton</th>
                                <th>Companyname</th>
                                <th>Edit</th>
                                <th>Remove</th>

                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product, index) => (
                                <>
                                    <tr key={product._id}>
                                        <td >{index + 1}</td>
                                        <td style={{ height: '15rem', width: '20rem' }}><img src={`https://ecommerce-1mc7.onrender.com/images/${product.imageA}`} alt={product.name} style={{ width: '100px' }} /></td>
                                        <td style={{ height: '6rem', width: '18rem' }}>{product.name}</td>
                                        <td style={{ height: '6rem', width: '15rem' }}>${product.price}</td>
                                        <td style={{ height: '10rem', width: '50rem' }}>{product.category}</td>
                                        <td style={{ height: '6rem', width: '10rem' }}>{product.companyname}</td>
                                        <td ><a className="icon"><i className='bx bxs-edit-alt' style={{ color: '#2140fb' }} onClick={showedit} ></i></a></td>
                                        <td ><a className="icon"><i class='bx bxs-trash-alt' style={{ color: '#df0808' }} onClick={handleShow}></i></a></td>
                                    </tr>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Confirm Delete Record</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are You sure you want to delete this ?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                cancel
                                            </Button>
                                            <Button variant="danger" onClick={() => handleo(product._id)}>
                                                confirm
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <Modal show={edit} onHide={handleedit}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are You sure you want to Edit this ?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleedit}>
                                                cancel
                                            </Button>

                                            <Link to={`/update/${product._id}`} onClick={handleedit} className="btn btn-primary">Edit</Link>

                                        </Modal.Footer>
                                    </Modal>
                                </>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export { ProductList };
