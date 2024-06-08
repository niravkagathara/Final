import { React, useEffect, useState } from "react";
// import "../components/in.css";
import {  Link, Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [error, setError] = useState(false);
  const ca = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      nav("/");
    }
  });

  const handlecancle = async () => {
      ca('/');
  }
  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false
  }
    let result = await fetch(`https://ecommerce-1mc7.onrender.com/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result));
      
   const tok= localStorage.setItem("tk",JSON.stringify(result.token));
   const ro= localStorage.setItem("r", JSON.stringify(result.role));
   const user= localStorage.setItem("author", JSON.stringify(result.user));
    const id =localStorage.setItem("id", JSON.stringify(result.id));
    console.log(result)
      nav("/");
    } else {
      alert("please fill details");
    }
  };

  return (
    <>
    {/* Login */}
<div className="container">
  <div className="login-form">
    <form action>
      <h1>Login</h1>
      <p>
        Already have an account? Login in or
        <a href="/signup">Sign Up</a>
      </p>
      <label htmlFor="email">Email</label>
      {/* {error && !email && <span className="invalid-input">Enter valid email</span>} */}

      <input type="text" placeholder="Enter Email" name="email" onChange={(e) => { setEmail(e.target.value) }} value={email} required />
      <label htmlFor="psw">Password</label>
      {/* {error && !password && <span className="invalid-input">Enter valid name</span>} */}

      <input type="password" placeholder="Enter Password" name="psw"  onChange={(e) => { setPassword(e.target.value) }} value={password}  required />
      
      <p>
        By creating an account you agree to our
        <a href="#">Terms &amp; Privacy</a>.
      </p>
      <div className="buttons">
      <button type="button" onClick={handlecancle} className="signupbtn">Cancle</button>
      <button type="button" onClick={handleLogin} className="signupbtn">Login</button>
      </div>
    </form>
  </div>
</div>

    </>
  )
}

export default Login
