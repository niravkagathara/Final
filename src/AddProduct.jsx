import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

const AddProduct = () => {
    const [file, setFile] = useState();
    const { Formik } = formik;
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        file: yup.mixed().required(),
        terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
    });

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [companyname, setCompany] = React.useState('');

    const [error, setError] = React.useState(false);
    const nav = useNavigate();


    const addProduct = async () => {
        let responseData;
        let imageA;
        const formData = new FormData();
        formData.append('file', file);

        await fetch(`https://ecommerce-1mc7.onrender.com/upload`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData
        })
            .then((res) => res.json()).then((data) => { responseData = data })
        if (!name || !price || !companyname || !category) {
            setError(true);
            return false
        }
        const token = JSON.parse(localStorage.getItem('tk'));
        const userId = JSON.parse(localStorage.getItem('user')).user._id;
        imageA = responseData.image_url
        let result = await fetch(`https://ecommerce-1mc7.onrender.com/product/add-product`, {
            method: "POST",
            body: JSON.stringify({ name, price, category, companyname, userId, imageA }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        if (result) {
            nav('/product')
        }
        console.warn(result)
    }
    return (


        <>

            <div className="product">
                <table>
                    <tbody>
                        <tr>
                            <td> <h1 className=" q">Add Product</h1></td>
                        </tr>
                    </tbody>
                </table>
                <Formik
                    validationSchema={schema}
                    onSubmit={console.log}
                    initialValues={{
                        firstName: 'Mark',
                        lastName: 'Otto',
                        username: '',
                        city: '',
                        state: '',
                        zip: '',
                        file: null,
                        terms: false,
                    }}
                >
                    {({ handleSubmit }) => (
                           
                        <Form className="center" onSubmit={handleSubmit}>
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter Product Name"
                                        onChange={(e) => { setName(e.target.value) }} value={name}
                                    />
                                    <Form.Control.Feedback ></Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik102"
                                    className="position-relative"
                                >
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number" placeholder="Enter Prduct Price"
                                        onChange={(e) => { setPrice(e.target.value) }} value={price}
                                        name="lastName"
                                    />

                                    <Form.Control.Feedback ></Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
                                    <Form.Label>Descripton</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Product descripton" className="inputBox"
                                            onChange={(e) => { setCategory(e.target.value) }} value={category}
                                            aria-describedby="inputGroupPrepend"
                                            name="username"

                                        />

                                    </InputGroup>
                                </Form.Group>
                            <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationFormik103"
                                className="position-relative"
                            >
                                <Form.Label>company</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product Company"
                                    onChange={(e) => { setCompany(e.target.value) }} value={companyname}
                                    name="city"

                                />


                            </Form.Group>

                            <Form.Group className="position-relative mb-3">
                                <Form.Label>File</Form.Label>
                                <Form.Control
                                    type="file"
                                    required
                                    onChange={(e) => {
                                        setFile(e.target.files[0]);
                                    }}
                                    name="file"
                                />

                            </Form.Group>
                            <Button type="submit" onClick={addProduct}>Add Product </Button>
                        </Form>
                       
                    )}
                </Formik>
            </div>
        </>
    )
};

export { AddProduct };
