import React from 'react';
import a1 from "./images/product-7.jpg";
import a2 from "./images/product-4.jpg";
import a3 from "./images/product-1.jpg";
import a4 from "./images/product-6.jpg";




function Featured() {
  return (
   <><section className="section new-arrival">
  <div className="title">
    <h1>Featured</h1>
    <p>All the latest picked from designer of our store</p>
  </div>
  <div className="product-center">
    <div className="product-item">
      <div className="overlay">
        <a href className="product-thumb">
          <img src={a1} alt />
        </a>
        <span className="discount">50%</span>
      </div>
      <div className="product-info">
        <span>MEN'S CLOTHES</span>
        <a href>Quis Nostrud Exercitation</a>
        <h4>$700</h4>
      </div>
      <ul className="icons">
        <li><i className="bx bx-heart" /></li>
        <li><i className="bx bx-search" /></li>
        <li><i className="bx bx-cart" /></li>
      </ul>
    </div>
    <div className="product-item">
      <div className="overlay">
        <a href className="product-thumb">
          <img src={a2} alt />
        </a>
      </div>
      <div className="product-info">
        <span>MEN'S CLOTHES</span>
        <a href>Sonata White Men’s Shirt</a>
        <h4>$800</h4>
      </div>
      <ul className="icons">
        <li><i className="bx bx-heart" /></li>
        <li><i className="bx bx-search" /></li>
        <li><i className="bx bx-cart" /></li>
      </ul>
    </div>
    <div className="product-item">
      <div className="overlay">
        <a href className="product-thumb">
          <img src={a3} alt />
        </a>
        <span className="discount">40%</span>
      </div>
      <div className="product-info">
        <span>MEN'S CLOTHES</span>
        <a href>Concepts Solid Pink Men’s Polo</a>
        <h4>$150</h4>
      </div>
      <ul className="icons">
        <li><i className="bx bx-heart" /></li>
        <li><i className="bx bx-search" /></li>
        <li><i className="bx bx-cart" /></li>
      </ul>
    </div>
    <div className="product-item">
      <div className="overlay">
        <a href className="product-thumb">
          <img src={a4} alt />
        </a>
      </div>
      <div className="product-info">
        <span>MEN'S CLOTHES</span>
        <a href>Edor do eiusmod tempor</a>
        <h4>$900</h4>
      </div>
      <ul className="icons">
        <li><i className="bx bx-heart" /></li>
        <li><i className="bx bx-search" /></li>
        <li><i className="bx bx-cart" /></li>
      </ul>
    </div>
  </div></section>

   </>
  )
}

export default Featured
