import "./Navbar.css";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar">

    <div className="navbar-logo">
      <img
        src="/logo/logo-without-tagline.png"
        alt="Ascendra Logo"
        className="logo"
      />
    </div>


      <div className="navbar-links">

        <Link to="/">Home</Link>

        <a href="#features">Features</a>

        <a href="#technology">Technology</a>

        <a href="#about">About</a>

      </div>

      <div className="navbar-buttons">

        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/register" className="get-started-btn">
          Get Started
        </Link>

      </div>

      <button className="mobile-menu">

        <Menu size={28} />

      </button>

    </nav>
  );
};

export default Navbar;