import React from 'react'
import a from "./images/ww.png";
function Promo() {
  return (
    <><section className="section banner">
  <div className="left">
    <span className="trend">Trend Design</span>
    <h1>New Collection 2021</h1>
    <p>New Arrival <span className="color">Sale 50% OFF</span> Limited Time Offer</p>
    <a href="#" className="btn btn-1">Discover Now</a>
  </div>
  <div className="right">
    <img src={a} alt />
  </div>
</section>

    </>
  )
}

export default Promo
