import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Userupdate = () => {
    const [file, setFile] = useState();

    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [photo, setphoto] = useState('')
    const [role, setrole] = useState('');
    const [password, setpassword] = React.useState('');
    const par = useParams();
    const nav = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        const token = JSON.parse(localStorage.getItem('tk'));

        let result = await fetch(`https://ecommerce-1mc7.onrender.com/${par.id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        result = await result.json();
        setName(result.name)
        setemail(result.email)
        setpassword(result.password)
        setrole(result.role)
        setphoto(result.photo)

    }
    const UpdateProduct = async () => {
        let responseData;
        let photo;
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
        photo = responseData.image_url

        let result = await fetch(`https://ecommerce-1mc7.onrender.com/${par.id}`, {
            method: 'put',
            body: JSON.stringify({ name, email, password, role, photo }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`

            }
        });
        result = await result.json();
        if (result) {
            nav('/user')
        }

    }
    return (
        <div className="product">
            <h1>Update user</h1>
            name
            <input type="text" placeholder="Enter Product Name" className="inputBox"
                onChange={(e) => { setName(e.target.value) }} value={name}
            />
            email
            <input type="text" placeholder="Enter Prduct email" className="inputBox"
                onChange={(e) => { setemail(e.target.value) }} value={email}
            />
            password
            <input type="text" placeholder="Enter Product password" className="inputBox"
                onChange={(e) => { setpassword(e.target.value) }} value={password}
            />

            <input type="radio" placeholder="Enter role" name='role' className=""
                onChange={(e) => { setrole(e.target.value) }} value='user' />user
            <br />
            <input type="radio" placeholder="Enter role" name='role' className=""
                onChange={(e) => { setrole(e.target.value) }} value='admin' />admin
            <br></br>


            image path<br />
            <input type="file" onChange={(e) => { setFile(e.target.files[0]); }} />
            <img src={`https://ecommerce-1mc7.onrender.com/images/${photo}`} style={{ width: '100px' }} />
            <br />



            <button type="button" className="appButton" onClick={UpdateProduct}>Update user </button>
        </div>
    )
};

export { Userupdate };
