import React from 'react'
import a1 from "./images/product-8.jpg"
import a2 from "./images/product-5.jpg"
import a3 from "./images/product-2.jpg"
import a4 from "./images/product-7.jpg"
import a5 from "./images/product-4.jpg"
import  { useEffect, useState } from 'react'
import { add } from "./store/cartSlice";
import { useDispatch } from "react-redux";
import {  useParams } from 'react-router';
import { Link, useNavigate } from "react-router-dom";

function ProductDetail() {


  const dispatch = useDispatch();

  const handleAdd = (product) => {
      dispatch(add(product));
      nav('/cart');
  }
  useEffect(() => {
      getProductDetails();
  }, []);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageA, setimageA] = useState('');
  const [companyname, setCompany] = React.useState('');
  const par = useParams();
  const [ida, setid] = useState()


  const getProductDetails = async () => {

      let result = await fetch(`https://ecommerce-1mc7.onrender.com/product/all/${par.id}`,
          {
              headers: {
                  "Content-Type": "application/json",
              }
          });
      result = await result.json();
      setName(result.name)
      setPrice(result.price)
      setCategory(result.category)
      setCompany(result.companyname)
      setimageA(result.imageA)
      setid(result)
  }


  
  const nav = useNavigate();
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    getProducts();

  }, []);

  const getProducts = async () => {
    let result = await fetch(`https://ecommerce-1mc7.onrender.com/product/get`,

    );
    result = await result.json();
    setProducts(result);
  }

  const moredet = (e) => {
    nav(`/detail/${e}`);
  }
  return (
  <><div>
  {/* Product Details */}
  <section className="section product-detail">
    <div className="details container">
      <div className="left image-container">
        <div className="main">
          <img src={`https://ecommerce-1mc7.onrender.com/images/${imageA}`} alt="Card image cap"id="zoom"  />
        </div>
      </div>
      <div className="right">
        <span>{companyname}</span>
        <h1>{name}</h1>
        <div className="price">${price}</div>
        {/* <form>
          <div>
            <select>
              <option value="Select Size" selected disabled>
                Select Size
              </option>
              <option value={1}>32</option>
              <option value={2}>42</option>
              <option value={3}>52</option>
              <option value={4}>62</option>
            </select>
            <span><i className="bx bx-chevron-down" /></span>
          </div>
        </form> */}
        <form className="form">
          {/* <input type="text" placeholder={1} onChange={(e) =>{cartItem.cartQuantity} }/> */}
          <a href="/cart" onClick={() => handleAdd(ida)} className="addCart">Add To Cart</a>
        </form>
        <h3>Product Detail</h3>
        <p>
        {category}
        </p>
      </div>
    </div>
  </section>
  {/* Related */}
  <section className="section featured">
    <div className="top container">
      <h1>Related Products</h1>
      <a href="#" className="view-more">View more</a>
    </div>
    <div className="product-center container">
     {
                products.map((e, index) =>
                  <div className=" product-item" key={e._id}>
                    <div className="overlay">
                      <a href={`/detail/${e._id}`} className="product-thumb">
                        <img className="card-img-top" src={`https://ecommerce-1mc7.onrender.com/images/${e.imageA}`} alt="Card image cap" />
                      </a>
                      {/* <span className="discount">40%</span> */}

                    </div>
                    <div className="product-info">
                      {/* <span>MEN'S CLOTHES</span> */}
                      <a href={`/detail/${e._id}`}>{e.name}</a>
                      <h4>${e.price}</h4>
                    </div>
                    <ul className="icons">
                    <li  onClick={()=> handleAdd(e)}><i className="bx bx-cart" /></li>
                      <li  onClick={() => moredet(e._id)}><i class='bx bx-info-circle'></i></li>

                      {/* <li><i className="bx bx-heart" /></li> */}
                      {/* <li><i className="bx bx-search" /></li> */}
                      {/* onClick={() => moredet(e._id)} */}
                    </ul>
                  </div>
                )}
    </div>
  </section>
</div>

  </>
  )
}

export default ProductDetail
