import Container from 'react-bootstrap/Container';
import {  Nav, Navbar, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import { NavLink } from 'react-router-dom'; 
import "../styles/navbar.css"

export default function Root() {
  return (
      <div className="NavbarPage">
          <Navbar bg="dark" variant='dark' collapseOnSelect expand="lg" >
            <Container>
              <Navbar.Brand as={NavLink} to={"/"}>Slavik Ferris</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                </Nav>
                <Nav>
                  <Navbar.Collapse className="justify-content-end">
 
                  <Nav.Link as={NavLink} to={"/about"}>About</Nav.Link>
                    <NavDropdown title="Projects" id="collapsible-nav-dropdown">
                      <NavDropdown.Item as={NavLink} to={"/financeApp"}>Finance Tracking</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to={"/anotherApp"}>Another App</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to={"/someOtherApp"}>Some other App</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="https://github.com/zlavik">GitHub</NavDropdown.Item>
                    </NavDropdown>
                  <Nav.Link href="https://www.linkedin.com/in/slavik-ferris/">LinkedIn</Nav.Link>
                  </Navbar.Collapse>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Outlet />
      </div>
  );
}