
import React, { useEffect } from "react";
import { add } from "./store/cartSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


function Products() {
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
    dispatch(add(product))
    nav('/cart')

  }
  const moredet = (e) => {
    nav(`/detail/${e}`);
  }
  return (
    <>
      <div>
  <section className="section all-products" id="products">
    <div className="top container">
      <h1>All Products</h1>
      <form>
        <select>
          <option value={1}>Defualt Sorting</option>
          <option value={2}>Sort By Price</option>
          <option value={3}>Sort By Popularity</option>
          <option value={4}>Sort By Sale</option>
          <option value={5}>Sort By Rating</option>
        </select>
        <span><i className="bx bx-chevron-down" /></span>
      </form>
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
                    <li   onClick={()=> handleAdd(e)} ><i className="bx bx-cart"/></li>
                      <li onClick={() => moredet(e._id)}><i class='bx bx-info-circle' ></i></li>

                      {/* <li><i className="bx bx-heart" /></li> */}
                      {/* <li><i className="bx bx-search" /></li> */}
                      {/* onClick={() => moredet(e._id)} */}
                    </ul>
                  </div>
                )}
    </div>
  </section>
  <section className="pagination">
    <div className="container">
      <span>1</span> <span>2</span> <span>3</span> <span>4</span>
      <span><i className="bx bx-right-arrow-alt" /></span>
    </div>
  </section>
</div>

    </>
  )
}

export default Products
