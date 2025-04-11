import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import '../../CustomerMenu.css';
import { useNavigate } from "react-router-dom";
import customermenuimg from "../../customerMenu.png"


const CustomerMenu = () => {
  let navigate = useNavigate();
  const username = localStorage.getItem("username"); // Retrieve username

  const logoutHandler = () => {
    localStorage.removeItem("userCategory");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username"); // Remove username on logout
    navigate("/");
  }

  return (
    <>
    <Navbar expand="lg" className="customer-navbar">
      <Container fluid>
        <Navbar.Brand className="customer-brand">Customer Menu</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <NavDropdown title="Customer" id="customer-details-dropdown" className="customer-details-dropdown">
              <NavDropdown.Item href="/customer-addition" className="customer-details-dropdown-item">Customer Registration</NavDropdown.Item>
              <NavDropdown.Item href="/customer-details" className="customer-details-dropdown-item">Customer Details</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Expense" id="customer-expense-dropdown" className="customer-dropdown">
              <NavDropdown.Item href="/expense-entry" className="customer-dropdown-item">Expense Entry</NavDropdown.Item>
              <NavDropdown.Item href="/expense-list" className="customer-dropdown-item">Expense List</NavDropdown.Item>
              <NavDropdown.Item href="/expense-report-pdf" className="customer-dropdown-item">Expense Report</NavDropdown.Item>
              <NavDropdown.Item href="/customer-category-list" className="customer-dropdown-item">Category List</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="navbar-username">Welcome {username}...</Nav.Link>
            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="image-container">
        <img src={customermenuimg} alt="Expense Management" className="background-image" />
    </div>
    </>
    
  );
};

export default CustomerMenu;
