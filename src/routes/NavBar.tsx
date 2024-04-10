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
            <li><Navbar.Brand as={NavLink} to={"/account"}>Account</Navbar.Brand><span className="icon"><i className="fa fa-user"></i></span></li>
          </ul>
        </div>
      </nav>
      </div>
      <Outlet />
    </div>
  );
}