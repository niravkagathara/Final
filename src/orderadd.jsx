import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Orderadd() {
    const pri = JSON.parse(localStorage.getItem('totalAmount'));

    const [costumerName, setcostumerName] = useState('');
    const [address, setaddress] = useState('');
    const [email, setemail] = useState('');
    const [phoneNumber, setphoneNumber] = React.useState('');
    const [totalAmount, settotalAmount] = React.useState('');

    const [error, setError] = React.useState(false);
    const nav = useNavigate();


    const addProduct = async () => {
        let userId;

        // if (!costumerName || !address || !email || !phoneNumber || !totalAmount ) {
        //     setError(true);
        //     return false
        // }
        const id = JSON.parse(localStorage.getItem('user')).user._id;
        userId=id
        let result = await fetch(`https://ecommerce-1mc7.onrender.com/addorder`,{
            method: "POST",
            body: JSON.stringify({ costumerName, address, email, phoneNumber, totalAmount, userId }),
            headers: {
                "Content-Type": "application/json",
              },
        });
        result = await result.json();
        if (result) {
            nav('/buynow')
        }
        console.warn(result)
    }
    return (
        <div className="product">
            <h1>billing info</h1>
            <input type="text" placeholder="Enter  costumerName" className="inputBox"
                onChange={(e) => { setcostumerName(e.target.value) }} value={costumerName}
            />
            {error && !costumerName && <span className="invalid-input">Enter valid costumerName</span>}

            <input type="text" placeholder="Enter  address" className="inputBox"
                onChange={(e) => { setaddress(e.target.value) }} value={address}
            />
            {error && !address && <span className="invalid-input">Enter valid address</span>}

            <input type="text" placeholder="Enter  email" className="inputBox"
                onChange={(e) => { setemail(e.target.value) }} value={email}
            />
            {error && !email && <span className="invalid-input">Enter valid email</span>}

            <input type="number" placeholder="Enter  phoneNumber" className="inputBox"
                onChange={(e) => { setphoneNumber(e.target.value) }} value={phoneNumber}
            />
            {error && !phoneNumber && <span className="invalid-input">Enter valid phoneNumber</span>}


            <input type="number" placeholder="Enter Product totalAmount" className="inputBox"
                onChange={(e) => { settotalAmount(e.target.value) }} value={totalAmount}
            />
            {error && !totalAmount && <span className="invalid-input">Enter valid totalAmount</span>}

            <p>pay amount <Link to={'/payment'} className="btn btn-primary"> ${pri}</Link></p>


            <button type="button" className="appButton" onClick={addProduct}>Add order </button>
        </div>
    )
};

export default Orderadd
