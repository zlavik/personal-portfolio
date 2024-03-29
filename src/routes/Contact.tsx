const Contact = () => {
  return (
    <div className="container">
        <div className="dashboard">

          <div className="dashboard-card stat">
            <div className="dashboard-card-content">
              <h3>3,536</h3>
              <p>contributions</p>
            </div>
          </div>
          <div className="dashboard-card stat">
            <div className="dashboard-card-content">
              <h3>536</h3>
              <p>followers</p>
            </div>
          </div>
          <div className="dashboard-card stat">
            <div className="dashboard-card-content">
              <h3>36</h3>
              <p>repositories</p>
            </div>
          </div>
          <div className="dashboard-card description">
            <div className="dashboard-card-content">
              <h3>More about Dan</h3>
              <p className="text-justify">I am full-stack dev with 5 years of experience in startups.</p>               </div>
          </div>
        </div>
      </div>
  )
}

export default Contact;