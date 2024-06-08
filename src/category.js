import React from 'react'
import q1 from './images/cat3.jpg';
import q2 from "./images/cat2.jpg";
import q3 from "./images/cat1.jpg";
function Category() {
  return (
   <>
   {/* Categories Section */}
<section className="section category">
  <div className="cat-center">
    <div className="cat">
      <img src={q1} alt />
      <div>
        <p>WOMEN'S WEAR</p>
      </div>
    </div>
    <div className="cat">
      <img src={q2} alt />
      <div>
        <p>ACCESSORIES</p>
      </div>
    </div>
    <div className="cat">
      <img src={q3} alt />
      <div>
        <p>MEN'S WEAR</p>
      </div>
    </div>
  </div>
</section>

   </>
  )
}

export default Category
