import { NavLink, Navbar } from "react-bootstrap";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Projects = () => {
return (
    <div className="new-wrapper">
    <div id="main">
      <div id="main-contents">
        <h1>Projects</h1>
        <div className="card">
          <div className="card-img" style={{backgroundImage: "url('https://minutehack.com/public/images/articles/2017/08/finances.jpg')"}}>
            <div className="overlay">
              <div className="overlay-content">
                <Navbar.Brand className="hover" as={NavLink} to={"/financeApp"}>View Project</Navbar.Brand>
              </div>
            </div>
          </div>
          <div className="card-content">
            <a href="#!">
              <h2>Finances</h2>
              <p>Keep track of where your money goes.</p>
            </a>
          </div>
        </div>
        <div className="card">
          <div className="card-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1491374812364-00028bbe7d2f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a22e4862c36c552e726815949fbcb41a&auto=format&fit=crop&w=500&q=60')"}}>
            <div className="overlay">
              <div className="overlay-content">
              <Navbar.Brand className="hover" as={NavLink} to={"/"}>View Project</Navbar.Brand>

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
      </div>
    </div>
    </div>
  )
}

export default Projects;