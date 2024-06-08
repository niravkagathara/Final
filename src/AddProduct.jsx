import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const AddProduct = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().required('Product name is required'),
        price: yup.number().required('Price is required').positive('Price must be positive'),
        category: yup.string().required('Description is required'),
        companyname: yup.string().required('Company name is required'),
        file: yup.mixed().required('File is required'),
    });

    const addProduct = async (values) => {
        const { name, price, category, companyname, file } = values;

        const formData = new FormData();
        formData.append('file', file);

        let responseData;
        await fetch(`https://ecommerce-1mc7.onrender.com/upload`, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: formData,
        })
            .then(res => res.json())
            .then(data => { responseData = data });

        const token = JSON.parse(localStorage.getItem('tk'));
        const userId = JSON.parse(localStorage.getItem('user')).user._id;
        const imageA = responseData.image_url;

        const result = await fetch(`https://ecommerce-1mc7.onrender.com/product/add-product`, {
            method: "POST",
            body: JSON.stringify({ name, price, category, companyname, userId, imageA }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const resultData = await result.json();
        if (resultData) {
            navigate('/product');
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add Product</h1>
            <Formik
                validationSchema={schema}
                initialValues={{
                    name: '',
                    price: '',
                    category: '',
                    companyname: '',
                    file: null,
                }}
                onSubmit={addProduct}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <FormikForm>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationFormik101">
                                <Form.Label>Product Name</Form.Label>
                                <Field name="name" type="text" placeholder="Enter Product Name" className="form-control" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationFormik102">
                                <Form.Label>Price</Form.Label>
                                <Field name="price" type="number" placeholder="Enter Product Price" className="form-control" />
                                <ErrorMessage name="price" component="div" className="text-danger" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationFormik103">
                                <Form.Label>Description</Form.Label>
                                <Field name="category" type="text" placeholder="Enter Product Description" className="form-control" />
                                <ErrorMessage name="category" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationFormik104">
                                <Form.Label>Company</Form.Label>
                                <Field name="companyname" type="text" placeholder="Enter Company Name" className="form-control" />
                                <ErrorMessage name="companyname" component="div" className="text-danger" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationFormik105">
                                <Form.Label>File</Form.Label>
                                <input
                                    name="file"
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue('file', event.currentTarget.files[0]);
                                        setFile(event.currentTarget.files[0]);
                                    }}
                                    className="form-control"
                                />
                                <ErrorMessage name="file" component="div" className="text-danger" />
                            </Form.Group>
                        </Row>
                        <Button type="submit" disabled={isSubmitting} className="mt-3">Add Product</Button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};

export { AddProduct };
