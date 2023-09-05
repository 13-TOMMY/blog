import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./MoreInfo.css";

function MoreInfo() {
  const [inputValue, setInputValue] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(value));
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      if (isValidEmail) {
        setInputValue("");
      }
    }
  };
  return (
    <div>
      <div className="contacts-container">
        <div className="contacts-left">
          <h3>Keep in touch</h3>
          <p>
            Curious about new offerings? <br /> Sign up for our weekly
            newsletter and stay informed.
          </p>
          <input
            type="email"
            className={`moreinfo-input ${!isValidEmail ? "invalid-email" : ""}`}
            placeholder="Your email"
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
          />

          {!isValidEmail && (
            <h4 className="error-message">
              Please enter a valid email address.
            </h4>
          )}
        </div>
        <div className="contacts-right">
          <h3>Let's Socialize</h3>
          <Link
            className="social-wrapper"
            to={"https://www.facebook.com/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Facebook</p>
            <FaFacebook className="social-icon" />
          </Link>
          <Link
            className="social-wrapper"
            to={"https://www.twitter.com/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Twitter</p>
            <FaTwitter className="social-icon" />
          </Link>
          <Link
            className="social-wrapper"
            to={"https://www.instagram.com/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Instagram</p>
            <FaInstagram className="social-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MoreInfo;
