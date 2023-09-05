import React from "react";
import { FaRegCopyright } from "react-icons/fa";
import "./Footer.css";
import MoreInfo from "../MoreInfo/MoreInfo";

function Footer() {
  return (
    <div className="footer-container">
      <MoreInfo />
      <div className="footer">
        <div className="footer-left">
          <p className="p-footer-left">About Us</p>
          <p className="p-footer-left">Terms & Conditions</p>
          <p className="p-footer-left">Privacy & Cookies Policies</p>
        </div>
        <div className="footer-right">
          <p className="date-footer-right">2023</p>
          <div className="copyright-container">
            <FaRegCopyright />
            <p className="p-footer-right">RE:serve</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;