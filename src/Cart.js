import a1 from "./images/product-2.jpg"
import a2 from "./images/product-3.jpg"
import a3 from "./images/product-4.jpg"
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  remove,
  clearCart,
  decreaseCart,
  getTotals,
  add,
} from './store/cartSlice';
import { Navigate } from "react-router";
import { Link } from "react-router-dom";


function Cart() {
  const auth = JSON.parse(localStorage.getItem('author'));
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
  }, [products, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(add(product));
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(remove(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  // const handleRemove = (productId) => {
  //   dispatch(remove(productId));
  // };
  const buynow = () => {
    {
      auth ? <Navigate to='/' /> : <Navigate to='/login' />
    }
  }
  return (
    <>
      {/* Cart Items */}
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {
          products.cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is currently empty</p>
              <div className="start-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Start Shopping</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="container cart">
              <table>
                <tbody><tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>SubTotal</th>
                </tr>
                  {products.cartItems &&
                    products.cartItems.map((cartItem, index) => (
                      <tr>
                        <td style={{ height: '2rem', width: '30rem' }}>
                          <div className="cart-info">
                            <img src={`https://ecommerce-1mc7.onrender.com/images/${cartItem.imageA}`} alt={cartItem.name} />
                            <div>
                              <p>{cartItem.name}</p>
                              <p>{cartItem.companyname}</p>
                              {/* <span>Price: ${cartItem.price}</span> <br /> */}
                              {/* <a href="#">remove</a> */}

                              <a className="icon" onClick={() => handleRemoveFromCart(cartItem)} >      <i class='bx bx-trash'></i></a>
                            </div>
                          </div>
                        </td>
                        <td>Price: ${cartItem.price}</td>
                        <td>
                          {/* <button onClick={() => handleDecreaseCart(cartItem)}>
                          -
                        </button> */}
                          <table style={{  width: '6rem' }}>
                            <tbody>
                              <tr>
                            <td>                          <a onClick={() => handleDecreaseCart(cartItem)} className="nav-link">
                              <i class='bx bx-minus' ></i></a></td>
                            <td>                          <div className="count">{cartItem.cartQuantity}</div>
                            </td>
                            <td>
                              <a onClick={() => handleAddToCart(cartItem)} className="nav-link"><i class='bx bx-plus'></i></a>

                            </td>
                            </tr>
                            </tbody>
                          </table>

                          {/* <button onClick={() => handleAddToCart(cartItem)}>+</button> */}
                        </td>
                        <td>                        ${cartItem.price * cartItem.cartQuantity}
                        </td>
                      </tr>
                    ))}

                </tbody></table>

              {/* <div className="total-price"> */}
              <div className="cart-summary">
                <button className="clear-btn" onClick={() => handleClearCart()}>
                  Clear Cart
                </button>
                <div className="cart-checkout">
                  <table>
                    <tbody><tr>
                      <td>Subtotal</td>
                      <td>${products.cartTotalAmount}</td>
                    </tr>
                      <tr>
                        <td>Tax</td>
                        <td>$50</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>${products.totala}</td>
                      </tr>
                    </tbody></table>
                  <div className="cart-checkout">

                    <p>Taxes and shipping calculated at checkout</p></div>
                  {auth ? <a href="/addorder" className="checkout btn">Proceed To Checkout</a>
                    : <a href="/login" className="checkout btn">Please Login</a>
                  }

                  <div className="continue-shopping">
                    <Link to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                        />
                      </svg>
                      <span>Continue Shopping</span>

                    </Link>
                  </div>
                </div>
              </div></div>
            // </div>
          )}
      </div>
    </>
  )
}

export default Cart
