/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { remult } from "remult";
import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"
import "../styles/financeApp.scss"
import Form from "react-bootstrap/esm/Form";
import { Button, Col, Modal, Row } from "react-bootstrap";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState(""); 

  const [signedIn, setSignedIn] = useState(false);
  const [transactions, setTransaction] = useState([]);
  const [transactionData, setTransactionData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });
  const [show, setShow] = useState(false);
  const [income, setIncome] = useState(false);
  const [style, setStyle] = useState("lossBG");
  const [loginClass, setLoginClass] = useState("containerForm");

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleDeleteClose = () => setShowDeleteButton(false);
  const handleDeleteShow = () => setShowDeleteButton(true);

  const handleIncome = () => {
    handleStyle()
    setIncome(!income); 
    setTransactionData({
      ...transactionData,
      is_income: income,
    });
  };

  const handleStyle = () => {
    console.log(style)
    if (income) {
      setStyle("lossBG")
    } else {
      setStyle("incomeBG")


    }
  }


  const handleClose = () => {
    setShow(false); 
    clearTransactionPage();
  };
  const handleShow = () => {
    if (!income) {
      setIncome(!income); 
      handleIncome()
    }
    setShow(true); 
    clearTransactionPage();
  };
  
  useEffect(() => {
    async function fetchUser() {
      fetch("/api/currentUser").then(async (result) => {
        const user = await result.json()
        remult.user = user;
        if (remult.user && remult.user.name) {
          fetchTransactions();
          setSignedIn(true);
        }
      });
    }
    fetchUser()
  }, []);



  async function doSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await fetch("/api/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (result.ok) {
      const user = await result.json()
      remult.user = user;
      fetchTransactions();
      setSignedIn(true);
      clearForm();
    } else {
      alert(await result.json())
    }
  }

  function clearForm() {
    setNewUsername("");
    setNewPassword("");
    setUsername("");
    setPassword("");
  }

  async function doRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newUsername, newPassword })
    });
    if (result.ok) {
      const user = await result.json()
      remult.user = user;
      setSignedIn(true);
      clearForm();
    } else {
      alert(await result.json())
    }
  }

  function clearTransactionPage() {
    setTransactionData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    })
  }

  function clearPage() {
    setTransaction([])

    setNewUsername("");
    setNewPassword("");
    setUsername("");
    setPassword("");
    clearTransactionPage();
    setSignedIn(false);
    setShowDeleteButton(false);
    remult.user = undefined; 
  }

  async function signOut() {
    await fetch("/api/signOut", {
      method: "POST"
    });
    clearPage();
  }

  async function deleteAccount() {
    await fetch("/api/deleteAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    });
    clearPage();
  }

  const fetchTransactions =  async () => {
    await fetch("/api/loadUserTransaction").then(async (result) => {
      if (remult.user) setTransaction(await result.json());
    })
  }

  const handleInputChange = (event: { target: { type: string; checked: any; value: any; name: any; }; }) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setTransactionData({
      ...transactionData,
      [event.target.name]: value,
    });
  };

  async function addTransaction() {
    const result = await fetch("/api/addUserTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transactionData)
    });

    if (result.ok) {
      remult.user = await result.json();
      clearTransactionPage()
      fetchTransactions();
      handleClose();
    } else {
      alert(await result.json())
    }
  }

  if (!signedIn) {
    return (
      <body>
        <div className={loginClass}>
          <div className="forms-containerForm">
            <div className="signin-signup">

              <form onSubmit={doSignIn} className="sign-in-form">
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <input type="submit" value="Login" className="btn solid" />
              </form>
              <form onSubmit={doRegister} className="sign-up-form">
                <h2 className="title">Sign up</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Username" value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
                </div>
                {/* <div className="input-field">
                  <i className="fas fa-envelope"></i>
                  <input type="email" placeholder="Email" />
                </div> */}
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                </div>
                <input type="submit" className="btn" value="Sign up" />
                
              </form>
            </div>
          </div>

          <div className="panels-containerForm">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here?</h3>
                <p>
                  To use this app you need an account to store your transactions.
                </p>
                <button className="btn transparent" id="sign-up-btn" onClick={() => setLoginClass("containerForm sign-up-mode")} >
                  Sign up
                </button>
              </div>
              <img src="img/log.svg" className="image" alt="" />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>Already have an account?</h3>
                <p>
                  Please sign in.
                </p>
                <button className="btn transparent" id="sign-in-btn" onClick={() => setLoginClass("containerForm")}>
                  Sign in
                </button>
              </div>
              <img src="img/register.svg" className="image" alt="" />
            </div>
          </div>
        </div>
      </body>
    )
  }

  return (
    <div>
      <body>
       <div className="container">
        <main className="main-content">
          <div className="top-container">
            
            <div>
            </div>
            <div className="user-nav">

              <div className="user-info">

                  <div className="sec-center"> 	
                  
                    <input className="dropdown" type="checkbox" id="dropdown" name="dropdown"/>
                    <label className="for-dropdown" htmlFor="dropdown">Setting<i className="fa fa-bars" aria-hidden="true"></i>
                    </label>
                      <div className="section-dropdown"> 
                        <a onClick={() => signOut()}>Sign Out <i className="fa fa-sign-in" aria-hidden="true"></i></a>
                        <a onClick={handleDeleteShow}>DELETE ACCOUNT<i className="fa fa-trash" aria-hidden="true"></i></a>
                        <Modal show={showDeleteButton} onHide={handleDeleteClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Delete Account?</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>This will delete your account and cannot be undone. Are you sure?</Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleDeleteClose}>
                              Cancel
                            </Button>
                            <Button  variant="danger" onClick={() => deleteAccount()}>
                              Delete Account
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
          <div className="bottom-container">
            <div className="bottom-container__left">
              <div className="box spending-box">
                <div className="header-container">
                    <h3 className="section-header">Spending Statistics</h3>
                    <div className="year-selector">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.8" width="24" height="24" rx="6" fill="#F6F7F9"/>
                            <path d="M13.4999 15.96L10.2399 12.7C9.85492 12.315 9.85492 11.685 10.2399 11.3L13.4999 8.04004" stroke="#1A202C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>2023</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.8" width="24" height="24" rx="6" fill="#F6F7F9"/>
                            <path d="M10.4551 15.96L13.7151 12.7C14.1001 12.315 14.1001 11.685 13.7151 11.3L10.4551 8.04004" stroke="#1A202C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                                    
                    </div>
                </div>
                <div className="bar-chart">
                    <canvas id="myChart" height="220px" width="660px"></canvas>
                </div>
              </div>
              <div className="box total-box">
                  <div className="total-box__left">
                      <div className="header-container">
                          <h3 className="section-header">Total Income</h3>
                          <svg className="up-arrow" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="42" height="42" rx="8" fill="#F6F7F9"/>
                              <path d="M27.0702 18.57L21.0002 12.5L14.9302 18.57" stroke="#7FB519" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M21 29.5V12.67" stroke="#7FB519" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>                                
                      </div>
                      <h1 className="price">$50,530.00<span className="price-currency">(USD)</span></h1>
                      <p><span className="percentage-increase">20%</span> increase compared to last week</p>                         
                  </div>
                  <div className="total-box__right">
                      <div className="header-container">
                          <h3 className="section-header">Total Expense</h3>
                          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="42" height="42" rx="8" fill="#F6F7F9"/>
                              <path d="M27.0702 23.43L21.0002 29.5L14.9302 23.43" stroke="#FF4423" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M21 12.5V29.33" stroke="#FF4423" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>                                                                    
                      </div>
                      <h1 className="price">$50,530.00<span className="price-currency">(USD)</span></h1>                            
                      <p><span className="percentage-decrease">10%</span> decrease compared to last week</p>
                  </div>
              </div>
              <div className="box transaction-box">
                  <div className="header-container">
                      <h3 className="section-header">Transaction History</h3>
                      <form>
                        <Button variant="primary" onClick={() => handleShow()}>
                        Add a transaction
                        </Button>
                        <Modal show={show} onHide={() => handleClose()} >
                          
                          <Modal.Header closeButton className={style}>
                            <Modal.Title>New Transaction</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          <Form>
                            <Row className="colPad">
                              <Col>
                                <input className='date' id='date' placeholder="Date" name='date' onChange={handleInputChange} value={transactionData.date}/>
                              </Col>
                              <Col>
                                <input className='category' id='category' placeholder="Category" name='category' onChange={handleInputChange} value={transactionData.category}/>
                              </Col>
                            </Row>
                            <Row className="colPad">
                              <Col>
                                <input className='description' id='description' placeholder="Description" name='description' onChange={handleInputChange} value={transactionData.description}/>
                              </Col>
                            </Row>
                            <Row >
                              <Col>
                                <input className='amount' id='amount' placeholder="Amount" name='amount' onChange={handleInputChange} value={transactionData.amount}/>
                              </Col>
                              <Col>
                              <div className="amount_container">
                                <div className="switch_container">
                                  <input id="is_income-id" type="checkbox" className="checkbox" onChange={handleIncome} checked={transactionData.is_income}/>
                                  <label htmlFor="is_income-id" className="switch" >
                                    <span className="circle">
                                      <span className="circle-inner"></span>
                                    </span>
                                    <span className="left">Income</span>
                                    <span className="right">Loss</span>
                                  </label>
                                </div>
                              </div>
                              </Col>
                            </Row>
                            <Row>
                            <Col>
                              </Col>
                            </Row>
                          </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Cancel
                            </Button>
                            <Button variant="primary" onClick={addTransaction}>
                              Add transaction
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </form>                    
                  </div>
                  <table className="transaction-history">
                    <tr>
                      <th>Date</th>
                      <th>description</th>
                      <th>category</th>
                      <th>amount</th>
                      <th>Income?</th>
                    </tr>
                    <tbody>
                      {transactions.map((transaction: any) => {
                        return (
                          <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.is_income ? 'Yes': 'No'}</td>

                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
              </div>                   
            </div>
            <div className="bottom-container__right">
              <div className="box">
                  <div className="header-container">
                      <h3 className="section-header">Your balance</h3>
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 10.4166C3.9 10.4166 3 11.3541 3 12.5C3 13.6458 3.9 14.5833 5 14.5833C6.1 14.5833 7 13.6458 7 12.5C7 11.3541 6.1 10.4166 5 10.4166Z" stroke="#1A202C" stroke-width="1.5"/>
                          <path d="M19 10.4166C17.9 10.4166 17 11.3541 17 12.5C17 13.6458 17.9 14.5833 19 14.5833C20.1 14.5833 21 13.6458 21 12.5C21 11.3541 20.1 10.4166 19 10.4166Z" stroke="#1A202C" stroke-width="1.5"/>
                          <path d="M12 10.4166C10.9 10.4166 10 11.3541 10 12.5C10 13.6458 10.9 14.5833 12 14.5833C13.1 14.5833 14 13.6458 14 12.5C14 11.3541 13.1 10.4166 12 10.4166Z" stroke="#1A202C" stroke-width="1.5"/>
                      </svg>                                                           
                  </div>
                  <h1 className="price">$120,435.00<span className="price-currency">(USD)</span></h1>
                  <p>From Jan 01, 2022 to Jan 31, 2022</p>
                  <div className="button-box">
                      <button className="btn btn-purple">
                          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.104 13.1771C9.104 14.1066 9.82277 14.8541 10.7044 14.8541H12.5061C13.2727 14.8541 13.8957 14.2025 13.8957 13.3879C13.8957 12.5158 13.5123 12.1996 12.9469 11.9983L10.0623 10.9921C9.49692 10.7908 9.1136 10.4841 9.1136 9.60248C9.1136 8.79748 9.7365 8.13623 10.5032 8.13623H12.3048C13.1865 8.13623 13.9053 8.88373 13.9053 9.81331" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M11.5 7.1875V15.8125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M21.0832 11.5C21.0832 16.79 16.7898 21.0833 11.4998 21.0833C6.20984 21.0833 1.9165 16.79 1.9165 11.5C1.9165 6.20996 6.20984 1.91663 11.4998 1.91663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M16.2915 2.875V6.70833H20.1248" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M21.0832 1.91663L16.2915 6.70829" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span>Top Up</span>    
                      </button>
                      <button className="btn btn-white">
                          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.104 13.1771C9.104 14.1066 9.82277 14.8541 10.7044 14.8541H12.5061C13.2727 14.8541 13.8957 14.2025 13.8957 13.3879C13.8957 12.5158 13.5123 12.1996 12.9469 11.9983L10.0623 10.9921C9.49692 10.7908 9.1136 10.4841 9.1136 9.60248C9.1136 8.79748 9.7365 8.13623 10.5032 8.13623H12.3048C13.1865 8.13623 13.9053 8.88373 13.9053 9.81331" stroke="#1A202C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M11.5 7.1875V15.8125" stroke="#1A202C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M21.0832 11.5C21.0832 16.79 16.7898 21.0833 11.4998 21.0833C6.20984 21.0833 1.9165 16.79 1.9165 11.5C1.9165 6.20996 6.20984 1.91663 11.4998 1.91663" stroke="#1A202C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M21.0833 5.74996V1.91663H17.25" stroke="#1A202C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M16.2915 6.70829L21.0832 1.91663" stroke="#1A202C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span>Transfer</span>    
                      </button>
                  </div>
              </div>
              <div className="box spending-box">
                <div className="header-container">
                    <h3 className="section-header">Spend by category</h3>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 10.4166C3.9 10.4166 3 11.3541 3 12.5C3 13.6458 3.9 14.5833 5 14.5833C6.1 14.5833 7 13.6458 7 12.5C7 11.3541 6.1 10.4166 5 10.4166Z" stroke="#1A202C" stroke-width="1.5"/>
                        <path d="M19 10.4166C17.9 10.4166 17 11.3541 17 12.5C17 13.6458 17.9 14.5833 19 14.5833C20.1 14.5833 21 13.6458 21 12.5C21 11.3541 20.1 10.4166 19 10.4166Z" stroke="#1A202C" stroke-width="1.5"/>
                        <path d="M12 10.4166C10.9 10.4166 10 11.3541 10 12.5C10 13.6458 10.9 14.5833 12 14.5833C13.1 14.5833 14 13.6458 14 12.5C14 11.3541 13.1 10.4166 12 10.4166Z" stroke="#1A202C" stroke-width="1.5"/>
                    </svg>                                                           
                </div>
                <div className="pie-chart">
                    <canvas id="myChart2" height="220px" width="220px"></canvas>
                </div>
                <div className="overall-spending">
                    <h4>Overall Spending</h4>
                    <span>$19,760,00</span>
                </div>
                <div className="pie-chart__labels">
                  <div className="pie-chart__labels-item">
                    <div className="label">
                        <div className="label__color first"></div>
                        Employees Salary
                    </div>
                    $8.000.00
                  </div>
                  
                  <div className="pie-chart__labels-item">
                    <div className="label">
                      <div className="label__color second"></div>
                      Material Supplies
                    </div>
                    $2.130.00
                  </div>
                  <div className="pie-chart__labels-item">
                    <div className="label">
                      <div className="label__color third"></div>
                      Company tax
                    </div>
                    $1.510.00
                  </div>
                  <div className="pie-chart__labels-item">
                    <div className="label">
                      <div className="label__color fourth"></div>
                      Maintenance system
                    </div>
                    $2.245.00
                  </div>
                  <div className="pie-chart__labels-item">
                    <div className="label">
                      <div className="label__color fifth"></div>
                      Development System
                    </div>
                    $4.385.00
                  </div>
                  <div className="pie-chart__labels-item">
                    <div className="label">
                      <div className="label__color sixth"></div>
                      Production Tools
                    </div>
                    $1.000.00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.2.1/chart.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </body>
    </div>
  )
}

