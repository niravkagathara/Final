import React from 'react'
import ha from "./images/hero-1.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './App.css';
import h2 from './images/hero-2.png';
import  { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";

import w1 from './images/pp.png';
import w2 from "./images/rr.png";

import q1 from './images/a.jpg';
import q2 from "./images/b.jpg";
import q3 from "./images/c.jpg";
import Popup from './Popup';
function Seac() {
    const glideRef = useRef(null);

  useEffect(() => {
    if (glideRef.current) {
      const glide = new Glide(glideRef.current, {
        type: "carousel",
        startAt: 0,
        // autoplay: 3000,
        gap: 0,
        hoverpause: true,
        perView: 1,
        animationDuration: 800,
        animationTimingFunc: "linear",
      });

      glide.mount();

      return () => glide.destroy();
    }
  }, []);
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
        <>
        {/* <br></br>
        <Carousel className='slid' responsive={responsive}>
             <img className="haa img-fluid" src={q1} alt />
             <img className="ha1 img-fluid" src={q2} alt />
             <img className="ha2 img-fluid" src={q3} alt />
</Carousel> */}

<div className="hero">
  <div ref={glideRef} className="glide" id="glide_1">
    <div className="glide__track" data-glide-el="track">
      <ul className="glide__slides">
        <li className="glide__slide">
          <div className="center">
            <div className="left">
              <span className>New Inspiration 2020</span>
              <h1 className>NEW COLLECTION!</h1>
              <p>Trending from men's and women's  style collection</p>
              <a href="/product" className="hero-btn">SHOP NOW</a>
            </div>
            <div className="right">
              <img className="img1" src={w1} alt />
            </div>
          </div>
        </li>
        <li className="glide__slide">
          <div className="center">
            <div className="left">
              <span>New Inspiration 2020</span>
              <h1>THE PERFECT MATCH!</h1>
              <p>Trending from men's and women's  style collection</p>
              <a href="/product" className="hero-btn">SHOP NOW</a>
            </div>
            <div className="right">
              <img className="img2" src={w2} alt />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
<Popup/>
        </>
    )
}

export default Seac
