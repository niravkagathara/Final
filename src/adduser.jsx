import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
    const [file, setFile] = useState();

    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [role, setrole] = useState('');

    const [password, setpassword] = useState('');
    const [error, setError] = React.useState(false);
    const nav = useNavigate();


    const addProduct = async () => {
        let responseData;
        let photo;
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

        if (!name || !email || !password || !role) {
            setError(true);
            return false
        }
        photo = responseData.image_url

        const token = JSON.parse(localStorage.getItem('tk'));
        let result = await fetch(`https://ecommerce-1mc7.onrender.com/add-user`, {
            method: "POST",
            body: JSON.stringify({ name, email, password, role, photo }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        if (result) {
            nav('/user')
        }
        console.warn(result)
    }
    return (
        <div className="product">
            <h1>add user</h1>
            <input type="text" placeholder="Enter user Name" className="inputBox"
                onChange={(e) => { setName(e.target.value) }} value={name}
            />
            {error && !name && <span className="invalid-input">Enter fill</span>}

            <input type="text" placeholder="Enter user email" className="inputBox"
                onChange={(e) => { setemail(e.target.value) }} value={email}
            />
            {error && !email && <span className="invalid-input">Enter valid formate</span>}

            <input type="text" placeholder="Enter password set" className="inputBox"
                onChange={(e) => { setpassword(e.target.value) }} value={password}
            />
            {error && !password && <span className="invalid-input">Enter valid formate</span>}

            <input type="radio" placeholder="Enter role" name='role' className=""
                onChange={(e) => { setrole(e.target.value) }} value='user' />user
                <br/>
           <input type="radio" placeholder="Enter role" name='role' className=""
                onChange={(e) => { setrole(e.target.value) }} value='admin' />admin
            {error && !password && <span className="invalid-input">Enter admin or user</span>}
            <br></br>
            <input type="file" onChange={(e) => {
                setFile(e.target.files[0]);
            }} />
            <button type="button" className="appButton" onClick={addProduct}>Add user </button>
        </div>
    )
};

export { AddUser };
