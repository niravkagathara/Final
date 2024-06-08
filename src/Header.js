import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const items = useSelector((state) => state.cart);
  const auth = localStorage.getItem('user');
  const user =  JSON.parse(localStorage.getItem('author'));

  const nav = useNavigate();
  const logout = () => {
      localStorage.clear();
      nav('/signup');
  }
  return (
    <div>
    <div>
     {/* Navigation */}
     <div className="top-nav">
       <div className="container d-flex">
         <p>Order Online Or Call Us: (001) 2222-55555</p>
         <ul className="d-flex">
           <li><a href="/about">About Us</a></li>
           <li><a href="#">FAQ</a></li>
           <li><a href="/contact">Contact</a></li>
         </ul>
       </div>
     </div>
     <div className="navigation">
       <div className="nav-center container d-flex">
         <a href="index.html" className="logo"><h1>Dans</h1></a>
         {/* <ul className="nav-list d-flex "> */}
         <ul className={`nav-list d-flex ${isMenuOpen ? 'open' : ''}`}>
         
           <li className="nav-item">
             <a href="/" className="nav-link">Home</a>
           </li>
           <li className="nav-item">
            <a href="/product" className="nav-link">product</a>
          </li>
           <li className="nav-item">
             <a href="/term" className="nav-link">Terms</a>
           </li>
           <li className="nav-item">
             <a href="/about" className="nav-link">About</a>
           </li>
           <li className="nav-item">
             <a href="/contact" className="nav-link">Contact</a>
           </li>
           
          
           {

auth ?
    <ul className="">
      <li className="nav-item">
             <a href="/signup" onClick={logout} className="icon"><i className='bx bx-log-out'></i></a>
           </li>
        {/* <li className="nav-item "><Link className="nav-link" onClick={logout} to="/signup">Logout</Link></li> */}
    </ul>

    :
    <ul className="">
      <li className="nav-item">
             <a href="/login" className="icon"><i className='bx bx-log-in'></i></a>
           </li>
        {/* <li className="nav-item">  <Link className="nav-link" to="/signup">SignUp</Link></li> */}
        {/* <li className="nav-item active"> <Link className="nav-link" to="/login">Login<span className="sr-only"></span></Link></li> */}
    </ul>
}

           <li className="icons d-flex">
             <a href="/profile" className="icon">
               <i className="bx bx-user" />
             </a>
             
             {/* <div className="icon">
               <i className="bx bx-heart" />
               <span className="d-flex">0</span>
             </div> */}
             <a href="/cart" className="icon">
               <i className="bx bx-cart" />
               <span className="d-flex">{items.cartItems.length}</span>
             </a>
           </li>
         </ul>
         
         <div className="hamburger" onClick={toggleMenu}>
           <i className="bx bx-menu-alt-left" />
         </div>
       </div>
     </div>
   </div>
   
       </div>
  )
}

export default Header
