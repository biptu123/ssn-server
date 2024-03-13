import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.jpg";
import { NavLink } from "react-bootstrap";

const Header = () => {
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
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            <img src={logo} className="img-fluid logo" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav
              className="me-auto mx-3 my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLinkButton to="/">Home</NavLinkButton>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
