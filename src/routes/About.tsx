import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const About = () => {
  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard-card main">
          <div className="dashboard-card-content">
            <img src="https://cdn.wetransfer.net/assets/transfer_window/transfer_error-5cb9b360b9f6c8dbcc744c9cb436e3ff3d66aeda055c6a588f71b6ee61588e27.jpg" alt="img"/>
            <h2>Dan Covic</h2>
            <p>CTO @ Le Wagon</p>
            <button className="btn">Get in touch</button>
          </div>
        </div>
 
        <div className="dashboard-card description aboutMe">
          <div className="dashboard-card-content">
            <h3>More about Dan</h3>
            <p className="text-justify">I am full-stack dev with 5 years of experience in startups.</p>               </div>
        </div>
      </div>
    </div>
  )
}

export default About;