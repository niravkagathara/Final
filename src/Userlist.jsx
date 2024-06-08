import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const User1 = () => {
    const [users, setUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDelete = async () => {
        setShowDeleteModal(false);
        deleteUser(selectedUser._id);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const token = JSON.parse(localStorage.getItem('tk'));
        try {
            const response = await fetch(`https://ecommerce-1mc7.onrender.com/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            setUsers(result);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (id) => {
        const token = JSON.parse(localStorage.getItem('tk'));
        try {
            const response = await fetch(`https://ecommerce-1mc7.onrender.com/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (result) {
                getUsers();
            } else {
                alert('Error deleting user');
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="Product-list">
            <div className="container">
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h1 className="text-sm-end q">User List</h1>
                            </td>
                            <td>
                                <Link to="/adduser" className="btn btn-primary btn-lg active mb-3" role="button" aria-pressed="true">Add user</Link>
                            </td>
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
                            <th>Role</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td style={{ height: '6rem', width: '20rem' }}>
                                    <img src={`https://ecommerce-1mc7.onrender.com/images/${user.photo}`} alt={user.name} style={{ width: '100px' }} />
                                </td>
                                <td style={{ width: '15rem' }}>{user.name}</td>
                                <td style={{ width: '9rem' }}>{user.role}</td>
                                <td style={{ width: '15rem' }}>{user.password}</td>
                                <td style={{ width: '30rem' }}>{user.email}</td>
                                <td>
                                    <i className='bx bxs-edit-alt' style={{ color: '#2140fb' }} onClick={() => handleShowEditModal(user)}></i>
                                </td>
                                <td>
                                    <i className='bx bxs-trash-alt' style={{ color: '#df0808' }} onClick={() => handleShowDeleteModal(user)}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {selectedUser && (
                    <>
                        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Delete Record</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
                                <Button variant="danger" onClick={handleDelete}>Confirm</Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showEditModal} onHide={handleCloseEditModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to edit this user?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseEditModal}>Cancel</Button>
                                <Link to={`/userupdate/${selectedUser._id}`} onClick={handleCloseEditModal} className="btn btn-primary">Edit</Link>
                            </Modal.Footer>
                        </Modal>
                    </>
                )}
            </div>
        </div>
    );
};

export { User1 };
