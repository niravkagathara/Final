import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const UpdateProduct = () => {
    const [file, setFile] = useState();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imageA, setimageA] = useState('');
    const [companyname, setCompany] = React.useState('');
    const par = useParams();
    const nav = useNavigate();
    useEffect(() => {
        getProductDetails();
    }, []);
    const getProductDetails = async () => {
        const token = JSON.parse(localStorage.getItem('tk'));

        let result = await fetch(`https://ecommerce-1mc7.onrender.com/product/${par.id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.companyname)
        setimageA(result.imageA)
    }


    const UpdateProduct = async () => {
        let responseData;
        let imageA;
        const formData = new FormData();
        formData.append('file', file);
        await fetch(`https://ecommerce-1mc7.onrender.com/upload/${par.imageA}`, {
            method: 'put',
            headers: {
                Accept: 'application/json',
            },
            body: formData
        })
            .then((res) => res.json()).then((data) => { responseData = data })

        const token = JSON.parse(localStorage.getItem('tk'));
        imageA = responseData.image_url
        let result = await fetch(`https://ecommerce-1mc7.onrender.com/product/${par.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, companyname, imageA }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        result = await result.json();
        if (result) {
            nav('/product')
        }

    }
    return (

        <div className="product">
            <h1>Update Product</h1>
            name
            <input type="text" placeholder="Enter Product Name" className="inputBox"
                onChange={(e) => { setName(e.target.value) }} value={name}
            />
            price
            <input type="number" placeholder="Enter Prduct Price" className="inputBox"
                onChange={(e) => { setPrice(e.target.value) }} value={price}
            />
            descripton
            <input type="text" placeholder="Enter Product descripton" className="inputBox"
                onChange={(e) => { setCategory(e.target.value) }} value={category}
            />
            company
            <input type="text" placeholder="Enter Product Company" className="inputBox"
                onChange={(e) => { setCompany(e.target.value) }} value={companyname}
            />
            image path<br></br>
            {/* <input type="text" placeholder="Enter Product image" className="inputBox"
                onChange={(e) => { setimageA(e.target.value) }} value={imageA}
            /> */}
            <input type="file" onChange={(e) => { setFile(e.target.files[0]); }} />
            <img src={`https://ecommerce-1mc7.onrender.com/images/${imageA}`} style={{ width: '100px' }} />
            <br />
            <button type="button" className="appButton" onClick={UpdateProduct}>Update Product </button>
        </div>
    )
};

export { UpdateProduct };
