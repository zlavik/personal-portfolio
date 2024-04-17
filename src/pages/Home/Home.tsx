import "../../App.css"

import 'bootstrap/dist/css/bootstrap.min.css';
import "./home.scss"
import {  Button, Modal, Navbar } from "react-bootstrap";
import { NavLink } from 'react-router-dom'; 
import { useState } from "react";


const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
      <div className="new-wrapper">
      <div id="main">
        <div id="main-contents">
          <h1>Slavik Ferris</h1>
          <p className="intro"><strong>Software Engineer</strong>. Full-Stack Software Engineer skilled in backend API design, data pipelines, AWS cloud solutions using Python/FastAPI, JavaScript/TypeScript/Node.js, 
          databases, and modern frontend development with HTML/CSS and React.</p>
          <h2>Showcase</h2>
          <div className="card">
            <div className="card-img" style={{backgroundImage: "url('https://minutehack.com/public/images/articles/2017/08/finances.jpg')"}}>
              <div className="overlay">
                <div className="overlay-content">
                  <Navbar.Brand as={NavLink} to={"/financeApp"}>View Project</Navbar.Brand>
                </div>
              </div>
            </div>
            <div className="card-content">

              <a href="#!" >

                <Button variant="primary" className="hiddenBtn" onClick={handleShow}>
                <h2>Budget Tracker</h2>
                <p>Click to view technologies used.</p>
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Body>
                  <h2>Technologies used</h2>
                  <table className="rwd-table center">

                    <tr>
                      <td >TypeScript</td>
                      <td >NodeJs</td>
                      <td >React</td>
                      <td >Postgres</td>
                    </tr>
                    <tr>
                      <td >Bootstrap</td>
                      <td >Remult</td>
                      <td >Express</td>
                      <td >bcrypt</td>
                    </tr>

                  </table>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                  </Modal>
              </a>
            </div>
          </div>
          <div className="card">
            <div className="card-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1491374812364-00028bbe7d2f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a22e4862c36c552e726815949fbcb41a&auto=format&fit=crop&w=500&q=60')"}}>
              <div className="overlay">
                <div className="overlay-content">
                  <a href="#!">View Project</a>
                </div>
              </div>
            </div>
            <div className="card-content">
              <a href="#!">
                <h2>Recipe Finder</h2>
                <p>Lorem ipsum dolor sit amet consectetur, lorem ipsum dolor</p>
              </a>
            </div>
          </div>
          <div className="card">
            <div className="card-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1519176336903-04be58a477d2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eda05ddcb3154f39fd8ce88fdd44f531&auto=format&fit=crop&w=500&q=60')"}}>
              <div className="overlay">
                <div className="overlay-content">
                  <a href="#!">View Project</a>
                </div>
              </div>
            </div>
            <div className="card-content">
              <a href="#!">
                <h2>Flight Tracker</h2>
                <p>Lorem ipsum dolor sit amet consectetur, lorem ipsum dolor</p>
              </a>
            </div>
          </div>
          <h2>Skills</h2>
          <p>Lorem ipsum dolor sit amet consectetur, lorem ipsum dolor</p>
          <p className="small"><strong>This is small text</strong>. Lorem ipsum dolor sit amet consectetur, lorem ipsum dolor</p>
        </div>
      </div>
      </div>
    )
}
 
export default Home;