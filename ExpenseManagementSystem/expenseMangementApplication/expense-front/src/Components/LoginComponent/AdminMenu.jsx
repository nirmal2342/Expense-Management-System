import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import '../../AdminMenu.css';
import adminMenuImg from "../../adminmenu.webp";
const AdminMenu = () => {
  let navigate = useNavigate();
  const username = localStorage.getItem("username"); // Retrieve username


  const logoutHandler = () => {
    localStorage.removeItem("userCategory");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username"); // Remove username on logout
    navigate("/");
  };

  return (
    <>
     
    <Navbar expand="lg" className="navbar-dark custom-navbar">
    <Container fluid className="position-relative">
        <Navbar.Brand className="navbar-title">Admin Menu</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <NavDropdown title="Customer" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/customer-list">Customer List</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/customer-current">Current Customer List</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/category-add">Category Addition</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin-category-list">Category List</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/adminReport">Expense Report</Nav.Link>

            <Nav.Link className="navbar-username">Welcome {username}...</Nav.Link>

            <Nav.Link onClick={logoutHandler} className="logout-link">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="image-container">
          <img src={adminMenuImg} alt="Expense Management" className="background-image" />
        </div>
        
    </>
  );
};

export default AdminMenu;
