import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../assets/images/logo.jpg";
import { useCart } from "../../context/cart";

const Toggler = ({ toggleFlag, setToggleFlag }) => {
  return (
    <div>
      <label
        className={`toggle ${toggleFlag ? "open" : null}`}
        htmlFor="checkbox"
        onClick={() => setToggleFlag(!toggleFlag)}
      >
        <div
          id="bar1"
          className={`bars ${toggleFlag ? "open bg-light" : null}`}
        />
        <div
          id="bar2"
          className={`bars ${toggleFlag ? "open bg-light" : null}`}
        />
        <div
          id="bar3"
          className={`bars ${toggleFlag ? "open bg-light" : null}`}
        />
      </label>
    </div>
  );
};

const LoginButton = ({ className, onClick }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
    if (onClick) onClick();
  };

  return (
    <button className={`${className} login-button`} onClick={handleClick}>
      <span className="top-key" />
      <span className="text">Login</span>
      <span className="bottom-key-1" />
      <span className="bottom-key-2" />
    </button>
  );
};

const CartButton = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  return (
    <button
      data-quantity={cart.length}
      className="btn-cart"
      onClick={() => navigate("/cart")}
    >
      <FaShoppingCart className="icon-cart" />
      <span className="quantity"></span>
    </button>
  );
};

const DropdownMenu = ({ className }) => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <button className={`login-button ${className}`} onClick={handleLogout}>
      <span className="top-key" />
      <span className="text">Logout</span>
      <span className="bottom-key-1" />
      <span className="bottom-key-2" />
    </button>
  );
};

const NavLinkButton = ({ children, to, active, onClick }) => {
  return (
    <Nav.Item>
      <Nav.Link
        as={NavLink}
        to={to}
        className={`nav-link mx-lg-2 ${active != null ? "active" : null}`}
        onClick={onClick}
      >
        {children}
      </Nav.Link>
    </Nav.Item>
  );
};

// ... (previous imports)

const Header = () => {
  const [toggleFlag, setToggleFlag] = useState(false);
  const [auth] = useAuth();
  // const navigate = useNavigate();

  const handleNavigation = () => {
    // Close the off-canvas menu
    setToggleFlag(false);
  };

  return (
    <Navbar expand="lg" fixed="top">
      <Navbar.Brand as={Link} to="/" className="navbar-brand">
        <img src={logo} className="img-fluid logo" alt="Logo" />
      </Navbar.Brand>

      <Offcanvas
        show={toggleFlag}
        onHide={() => setToggleFlag(false)}
        placement="end"
        className="w-100 text-light"
        style={{
          background: "#31363F",
        }}
      >
        <Offcanvas.Header>
          <Toggler toggleFlag={toggleFlag} setToggleFlag={setToggleFlag} />
        </Offcanvas.Header>

        <Offcanvas.Body>
          <ul className="navbar-nav justify-content-center  flex-grow-1 pe-3">
            <NavLinkButton to="/" onClick={handleNavigation}>
              Home
            </NavLinkButton>
            <NavLinkButton to="/about" onClick={handleNavigation}>
              About
            </NavLinkButton>
            <NavLinkButton to="/products" onClick={handleNavigation}>
              Products
            </NavLinkButton>
            <NavLinkButton to="/contact" onClick={handleNavigation}>
              Contact
            </NavLinkButton>

            {!auth?.user ? (
              <LoginButton className="m-login" onClick={handleNavigation} />
            ) : (
              <>
                <NavLinkButton
                  to={auth.user.role === 1 ? "/admin" : "/user"}
                  onClick={handleNavigation}
                >
                  Dashboard
                </NavLinkButton>
                <DropdownMenu />
              </>
            )}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {toggleFlag ? null : (
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end mx-3"
        >
          <Nav className="flex-grow-1 pe-3">
            <NavLinkButton to="/" onClick={handleNavigation}>
              Home
            </NavLinkButton>
            <NavLinkButton to="/about" onClick={handleNavigation}>
              About
            </NavLinkButton>
            <NavLinkButton to="/products" onClick={handleNavigation}>
              Products
            </NavLinkButton>
            <NavLinkButton to="/contact" onClick={handleNavigation}>
              Contact
            </NavLinkButton>
            {!auth?.user ? (
              <LoginButton className="m-login" onClick={handleNavigation} />
            ) : (
              <>
                <NavLinkButton
                  to={auth.user.role === 1 ? "/admin" : "user"}
                  onClick={handleNavigation}
                >
                  Dashboard
                </NavLinkButton>
                <DropdownMenu className="m-login" />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      )}

      <Nav className="d-flex flex-row justify-content-end">
        {!auth?.user ? (
          <LoginButton className="d-login" onClick={handleNavigation} />
        ) : (
          <DropdownMenu className="d-login" />
        )}
        <CartButton />
        <Toggler toggleFlag={toggleFlag} setToggleFlag={setToggleFlag} />
      </Nav>
    </Navbar>
  );
};

export default Header;
