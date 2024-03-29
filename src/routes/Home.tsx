import { Button, Card } from "react-bootstrap";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
    return (
        <div className="container">
        <div className="dashboard">
          <div className="dashboard-card main">
            <div className="dashboard-card-content">
              <img src="https://cdn.wetransfer.net/assets/transfer_window/transfer_error-5cb9b360b9f6c8dbcc744c9cb436e3ff3d66aeda055c6a588f71b6ee61588e27.jpg" alt="img"/>
              <h2>Slavik Ferris</h2>
              <p>Software Engineer</p>
              <button className="btn">Get in touch</button>
            </div>
          </div>
          <div className="dashboard-card stat">
            <div className="dashboard-card-content">
              <h3>Technologies</h3>
              <p>JavaScript</p>
              <p>TypeScript</p>
              <p>html</p>
              <p>css/Sass</p>
              <p>Node.js</p>
              <p>python</p>


            </div>
          </div>
          <div className="dashboard-card stat">
            <div className="dashboard-card-content">
              <h3>Libraries/Frameworks/Databases</h3>
              <p>React</p>
              <p>Vite</p>
              <p>Bootstrap</p>
              <p>FastAPI</p>
              <p>PostgreSQL</p>
              <p>GraphQL</p>

            </div>
          </div>
          <div className="dashboard-card stat">
            <div className="dashboard-card-content">
              <h3>Tools</h3>
              <p>Git</p>
              <p>AWS</p>
              <p>Docker</p>
              <p>Jenkins</p>
              <p>Kubernetes</p>
              <p>Jest/junit</p>

            </div>
          </div>
              <h3></h3>
              <div className="d-flex justify-content-around">
                <Card className="cardStuff">
                  <Card.Img variant="top" className="cardImg" src="https://png.pngtree.com/png-clipart/20200701/original/pngtree-online-shopping-payment-transactions-png-image_5342232.jpg" />
                  <Card.Body>
                    <Card.Title>Transactions Tracker</Card.Title>
                    <Card.Text>
                      Uses PostgreSQL to store transactions and visualize where your money is going.
                    </Card.Text>
                    <Button variant="primary" href="/financeApp" >View App</Button>
                  </Card.Body>
                </Card>
                <Card className="cardStuff">
                  <Card.Img variant="top" className="cardImg" src="https://img.icons8.com/?size=256&id=h4fAHTeTLGuR&format=png" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary" href="">View App</Button>
                  </Card.Body>
                </Card>                <Card className="cardStuff">
                  <Card.Img variant="top" className="cardImg" src="https://img.icons8.com/?size=256&id=w47a8-lntmBJ&format=png" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary" href="">View App</Button>
                  </Card.Body>
                </Card>


          </div>
        </div>
      </div>
    )
}
 
export default Home;