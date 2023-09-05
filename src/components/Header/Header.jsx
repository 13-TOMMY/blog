import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { auth } from "../../config/firebaseCongfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "./Header.css";

function Header() {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();

  const categories = ["Health", "Food", "Travel", "Technology"];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="header-container">
      <FaHome
        className="home-btn"
        onClick={() => {
          setSelectedCategory(null); 
          navigate("/");
        }}
      />
      {user && (
        <Link to="/addArticle" className="auth-link">
          Add Article
        </Link>
      )}
      <div className="categories-container">
        {categories.map((item, index) => (
          <Link
            to={`/category/${item}`}
            className={`nav-link ${
              location.pathname === `/category/${item}`
                ? "selected-category"
                : ""
            }`}
            key={index}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </Link>
        ))}
      </div>
      {user ? (
        <div>
          <span className="username">
            {user.displayName ? user.displayName : user.email}
          </span>
          <button
            className="auth-link"
            onClick={() => {
              signOut(auth);
              setSelectedCategory(null);
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <Link
          className="auth-link"
          to={"/auth"}
        >
          Sign Up
        </Link>
      )}
    </div>
  );
}

export default Header;
