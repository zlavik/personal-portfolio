import {  Nav, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import { NavLink } from 'react-router-dom'; 
import "../styles/navbar.css"

export default function Root() {

  const sideBarToggle = () => {
    $("html").toggleClass("openNav");
    $(".nav-toggle").toggleClass("active");
  }

  return (
      <div className="NavbarPage">
        <div className="primary-nav">

        <button className="hamburger open-panel nav-toggle" onClick={sideBarToggle}>
        <span className="screen-reader-text">Menu</span>
        </button>

        <nav role="navigation" className="menu">

        <Navbar.Brand className="logotype" as={NavLink} to={"/"}>Slavik <span>Ferris</span></Navbar.Brand>


          <div className="overflow-container">

            <ul className="menu-dropdown">

              <li><Navbar.Brand as={NavLink} to={"/"}>Home</Navbar.Brand><span className="icon"><i className="fa fa-home"></i></span></li>

              <li><Nav.Link href="https://www.linkedin.com/in/slavik-ferris/">LinkedIn</Nav.Link><span className="icon"><i className="fa fa-linkedin-square"></i></span></li>

              <li><Nav.Link href="https://github.com/zlavik">GitHub</Nav.Link><span className="icon"><i className="fa fa-github"></i></span></li>

            </ul>

          </div>

        </nav>

        </div>


      

          {/* <Navbar bg="dark" variant='dark' collapseOnSelect expand="lg" >
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
          </Navbar> */}
          <Outlet />
      </div>
  );
}