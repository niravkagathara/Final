import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const User1 = () => {
    const [products, setProducts] = React.useState([]);
    const [show, setShow] = useState(false);
    const [edit, setedit] = useState(false);

    const handleedit = () => setedit(false);
    const showedit = () => { setedit(true); }
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    const handleo = async (e) => {
        console.log(e)
        setShow(false);
        deleteProduct(e);
    }

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const token = JSON.parse(localStorage.getItem('tk'));
        let result = await fetch(`https://ecommerce-1mc7.onrender.com/`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async (id) => {
        const token = JSON.parse(localStorage.getItem('tk'));

        let result = await fetch(`https://ecommerce-1mc7.onrender.com/${id}`, {
            method: "Delete",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
        else {
            alert('error')
        }
    }


    return (
        <>

            <div className="Product-list">
                <div className="container"><br></br>
                    <table>
                        <tbody>
                            <tr>
                                <td> <h1 className="text-sm-end q">User List</h1></td>
                                <td> <Link to="/adduser" className="btn btn-primary btn-lg active mb-3" role="button" aria-pressed="true">Add user</Link></td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>

                    <Table responsive className="table">
                        <thead className="table-dark">
                            <tr>
                                <th >Index</th>
                                <th >Image</th>
                                <th >Name</th>
                                <th >Role</th>
                                <th >Password</th>
                                <th >Email</th>
                                <th >Edit</th>
                                <th >Remove</th>
                            </tr>
                        </thead>

                        <tbody >

                            {products.map((e, index) =>
                                <>
                                    <tr key={e._id}>
                                        <td >{index + 1}</td>
                                        <td style={{ height: '6rem', width: '20rem' }}><img src={`https://ecommerce-1mc7.onrender.com/images/${e.photo}`} alt={e.name} style={{ width: '100px' }} /></td>
                                        <td style={{ width: '15rem' }}>{e.name}</td>
                                        <td style={{ width: '9rem' }}>{e.role}</td>
                                        <td style={{ width: '15rem' }}>{e.password}</td>
                                        <td style={{ width: '30rem' }}>{e.email}</td>
                                        <td ><a className="icon"><i className='bx bxs-edit-alt' style={{ color: '#2140fb' }} onClick={showedit} ></i></a></td>
                                        <td ><a className="icon"><i className='bx bxs-trash-alt' style={{ color: '#df0808' }} onClick={handleShow}></i></a></td>

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
                                            <Button variant="danger" onClick={() => handleo(e._id)}>
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

                                            <Link to={'/userupdate/' + e._id} onClick={handleedit} className="btn btn-primary">Edit</Link>

                                        </Modal.Footer>
                                    </Modal>
                                </>
                            )}
                        </tbody>
                    </Table>

                </div>

            </div>
        </>
    )
}

export { User1 };
