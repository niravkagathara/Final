import React, { useState, useEffect } from "react";
import a from "./images/popup.jpg"
function Popup() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(handleClose);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };
  return (
    <div>
      
       <div className={`popup ${isVisible ? "" : "hide-popup"}`}>
          <div className="popup-content">
            <div className="popup-close"  onClick={handleClose}>
              <i className="bx bx-x" />
            </div>
            <div className="popup-left">
              <div className="popup-img-container">
                <img
                  className="popup-img"
                  src={a}
                  alt="popup"
                />
              </div>
            </div>
            <div className="popup-right">
              <div className="right-content">
                <h1>
                  Get Discount <span>50%</span> Off
                </h1>
                <p>
                  Sign up to our newsletter and save 30% for you next purchase.
                  No spam, we promise!
                </p>
                <form action="#">
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    className="popup-form"
                  />
                  <button className='ho-btn' type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
}

export default Popup;
