import React, { useEffect } from "react";
import { add } from "./store/cartSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import a1 from "./images/product-1.jpg";
import a2 from "./images/product-3.jpg";
import a3 from "./images/product-4.jpg";
import a4 from "./images/product-2.jpg";
import a5 from "./images/product-5.jpg";
import a6 from "./images/product-6.jpg";
import a7 from "./images/product-7.jpg";
import a8 from "./images/product-2.jpg";

function Aarrivel() {
  const dispatch = useDispatch();
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
  const handleAdd = (product) => {
    dispatch(add(product));
    nav('/cart')
  }
  const moredet = (e) => {
    nav(`/detail/${e}`);
  }
  return (
    <>
      <section className="section new-arrival">
        <div className="title">
          <h1>NEW ARRIVALS</h1>
          <p>All the latest picked from designer of our store</p>
        </div>
        <div className="product-center">
          {/* <div className="container">
            <div className="row"> */}
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
                    <li onClick={()=> handleAdd(e)}><i className="bx bx-cart"  /></li>
                      <li onClick={() => moredet(e._id)}><i class='bx bx-info-circle' ></i></li>

                      {/* <li><i className="bx bx-heart" /></li> */}
                      {/* <li><i className="bx bx-search" /></li> */}
                      {/* onClick={() => moredet(e._id)} */}
                    </ul>
                  </div>
                )}
            </div>
          {/* </div>
        </div> */}

      </section>

    </>
  )
}

export default Aarrivel;
