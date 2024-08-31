import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nava = useNavigate();
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      nava("/");
    }
    else{}
  },[])
  const collectData = async () => {
    if (!name || !email || !password) {
      setError(true);
      return false
    }
    let result = await fetch(`https://e-commerce-api-peach.vercel.app/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    result = await result.json();
    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result));
          
   const tok= localStorage.setItem("tk",JSON.stringify(result.token));
   const ro= localStorage.setItem("r", JSON.stringify(result.role));
   const user= localStorage.setItem("author", JSON.stringify(result.user));
    const id =localStorage.setItem("id", JSON.stringify(result.id));
      nava("/");
    } else {
      alert("please fill details");
    }
  }




  return (
   <>
     <div className="container">
  <div className="login-form">
    <form action>
      <h1>Sign Up</h1>
      <p>
        Please fill in this form to create an account. or
        <a href="/login">Login</a>
      </p>
      <label htmlFor="username"> Username</label>
      <input type="text" placeholder="Enter Username" name="username" value={name} onChange={(e) => { setName(e.target.value) }} required />
      {error && !name && <span className="invalid-input">Enter name</span>}

      <label htmlFor="email">Email</label>
      <input type="email" placeholder="Enter Email" name="email"  value={email} onChange={(e) => { setEmail(e.target.value) }} required />
      {error && !email && <span className="invalid-input">Enter email</span>}

      <label htmlFor="psw">Password</label>
      <input type="password" placeholder="Enter Password"  value={password} onChange={(e) => { setPassword(e.target.value) }} name="psw" required />
      {error && !password && <span className="invalid-input">Enter password</span>}
 
      <p>
        By creating an account you agree to our
        <a href="#">Terms &amp; Privacy</a>.
      </p>
      <div className="buttons">
      <Link to='/' className="cancelbtn"> <button type="button" className="cancelbtn">Cancel</button></Link>
        <button type="submit" onClick={collectData}  className="signupbtn">Sign Up</button>
      </div>
    </form>
  </div>
</div>

   </>
  )
}

export default Signup
