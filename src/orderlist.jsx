import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Orderlist() {
    const [products, setProducts] = React.useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); }
    const [show, setShow] = useState(false);
    const handleo = async (e) => {
        setShow(false);
        deleteProduct(e);
    }
    const handleedit = () => setShow(false);
    const showedit = () => {
        setShow(true);
    }
    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = async () => {
        const token = JSON.parse(localStorage.getItem('tk'));
        let result = await fetch(`https://ecommerce-1mc7.onrender.com/order/get`,
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

        let result = await fetch(`https://ecommerce-1mc7.onrender.com/order/${id}`, {
            method: "Delete",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        if (result) {
            getProducts();
            setShow(false);

        }
        else {
            alert('error')
        }
    }
    return (
        <div>
            <div className="Product-list">
                <div className="container">
                <br></br>
                    <table>
                        <tbody>
                            <tr>
                                <td> <h1 className="text-sm-end q">Order List</h1></td>
                                <td> <Link to="/addorder" className="btn btn-primary btn-lg active mb-3" role="button" aria-pressed="true">Add Order</Link></td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>

                    <Table responsive className="table">
                    <thead className="table-dark">
                            <tr>
                                <th>Index</th>
                                <th>costumerName</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>PhoneNumber</th>
                                <th>TotalAmount</th>
                                <th>UserId</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <>
                                <tr key={product._id}>
                                    <td >{index + 1}</td>
                                    <td style={{ height: '6rem', width: '10rem' }}>{product.costumerName}</td>
                                    <td style={{ height: '6rem', width: '22rem' }}>{product.address}</td>
                                    <td style={{ height: '6rem', width: '18rem' }}>{product.email}</td>
                                    <td style={{ height: '6rem', width: '12rem' }}>{product.phoneNumber}</td>
                                    <td style={{ height: '6rem', width: '10rem' }}>${product.totalAmount}</td>
                                    <td >{product.userId}</td>
                                    <td ><a className="icon"><i class='bx bxs-trash-alt' style={{ color: '#df0808' }} onClick={handleShow}></i></a></td>
                                    {/* <td ><a className="icon"><i className='bx bxs-edit-alt' style={{ color: '#2140fb' }} onClick={showedit} ></i></a></td>      */}
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
                                    {/* <Modal show={show} onHide={handleedit}>
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
                                    </Modal> */}
                                </>

                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Orderlist;
