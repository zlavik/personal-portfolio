import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/home.scss"


const Home = () => {
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
                  <a className="hover" href="/financeApp">View Project</a>
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
      //   <div className="container">
      //   <div className="dashboard">
      //     <div className="dashboard-card main">
      //       <div className="dashboard-card-content">
      //         <img src="https://cdn.wetransfer.net/assets/transfer_window/transfer_error-5cb9b360b9f6c8dbcc744c9cb436e3ff3d66aeda055c6a588f71b6ee61588e27.jpg" alt="img"/>
      //         <h2>Slavik Ferris</h2>
      //         <p>Software Engineer</p>
      //         <a className="btn" href='https://www.linkedin.com/in/slavik-ferris/' >Get in touch</a>
      //       </div>
      //     </div>
      //     <div className="dashboard-card stat">
      //       <div className="dashboard-card-content">
      //         <h3>Technologies</h3>
      //         <p>JavaScript</p>
      //         <p>TypeScript</p>
      //         <p>html</p>
      //         <p>css/Sass</p>
      //         <p>Node.js</p>
      //         <p>python</p>


      //       </div>
      //     </div>
      //     <div className="dashboard-card stat">
      //       <div className="dashboard-card-content">
      //         <h3>Libraries/Frameworks/Databases</h3>
      //         <p>React</p>
      //         <p>Vite</p>
      //         <p>Bootstrap</p>
      //         <p>FastAPI</p>
      //         <p>PostgreSQL</p>
      //         <p>GraphQL</p>

      //       </div>
      //     </div>
      //     <div className="dashboard-card stat">
      //       <div className="dashboard-card-content">
      //         <h3>Tools</h3>
      //         <p>Git</p>
      //         <p>AWS</p>
      //         <p>Docker</p>
      //         <p>Jenkins</p>
      //         <p>Kubernetes</p>
      //         <p>Jest/junit</p>

      //       </div>
      //     </div>
      //         <h3></h3>
      //         <div className="d-flex justify-content-around">
      //           <Card className="cardStuff">
      //             <Card.Img variant="top" className="cardImg" src="https://png.pngtree.com/png-clipart/20200701/original/pngtree-online-shopping-payment-transactions-png-image_5342232.jpg" />
      //             <Card.Body>
      //               <Card.Title>Transactions Tracker</Card.Title>
      //               <Card.Text>
      //                 Uses PostgreSQL to store transactions and visualize where your money is going.
      //               </Card.Text>
      //               <Button variant="primary" href="/financeApp" >View App</Button>

      //             </Card.Body>
      //           </Card>
      //           <Card className="cardStuff">
      //             <Card.Img variant="top" className="cardImg" src="https://img.icons8.com/?size=256&id=h4fAHTeTLGuR&format=png" />
      //             <Card.Body>
      //               <Card.Title>Card Title</Card.Title>
      //               <Card.Text>
      //                 Some quick example text to build on the card title and make up the
      //                 bulk of the card's content.
      //               </Card.Text>
      //               <Button variant="primary" href="">View App</Button>
      //             </Card.Body>
      //           </Card>                <Card className="cardStuff">
      //             <Card.Img variant="top" className="cardImg" src="https://img.icons8.com/?size=256&id=w47a8-lntmBJ&format=png" />
      //             <Card.Body>
      //               <Card.Title>Card Title</Card.Title>
      //               <Card.Text>
      //                 Some quick example text to build on the card title and make up the
      //                 bulk of the card's content.
      //               </Card.Text>
      //               <Button variant="primary" href="">View App</Button>
      //             </Card.Body>
      //           </Card>


      //     </div>
      //   </div>
      // </div>
    )
}
 
export default Home;