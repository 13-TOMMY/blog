import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./Header.css";
import { auth } from "../../config/firebaseCongfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";


function Header() {
  const [user] = useAuthState(auth);

  const categories = ["Health", "Food", "Travel", "Technology"];

  const navigate = useNavigate();
  return (
    <div className="header-container">
    <FaHome className="nav-link" onClick={() => navigate("/")} />
    <div className="categories-container">
      {categories.map((item, index) => (
        <Link to={`/category/${item}`} className="nav-link" key={index}>
          {item}
        </Link>
      ))}
    </div>
    {user ? (
      <div>
        <span className="username">
          {user.displayName ? user.displayName : user.email}
        </span>
        <button className="auth-link" onClick={() => signOut(auth)}>
          Log out
        </button>
      </div>
    ) : (
      <Link className="auth-link" to={"/auth"}>
        Signup
      </Link>
    )}
  </div>
  );
}

export default Header;
