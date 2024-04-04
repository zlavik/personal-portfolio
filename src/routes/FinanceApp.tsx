/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { remult } from "remult";
import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { Button, Col, Modal, Row } from "react-bootstrap";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState(""); 
  const [currentUser, setCurrentUser] = useState({
    name: '',
    id: ''
  });
  const [signedIn, setSignedIn] = useState(false);
  const [transactions, setTransaction] = useState([]);
  const [transactionData, setTransactionData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });
  const [hidden, setHidden] = useState(false)
  const [show, setShow] = useState(false);
  const [income, setIncome] = useState(false);
  const [style, setStyle] = useState("lossBG");

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
          setCurrentUser(user);
          setSignedIn(true);
          setHidden(true);
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
      setCurrentUser(user)
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
    setCurrentUser({
      name: '',
      id: ''
    })
    setNewUsername("");
    setNewPassword("");
    setUsername("");
    setPassword("");
    clearTransactionPage();
    setSignedIn(false);
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
      <div>
        <div className="container">
          <main className="main-content">
            <div className="top-container">
              <div>
              </div>
              <div className="user-nav">
                <button className="notification">
                    <svg className="notification__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0201 2.91003C8.71009 2.91003 6.02009 5.60003 6.02009 8.91003V11.8C6.02009 12.41 5.76009 13.34 5.45009 13.86L4.30009 15.77C3.59009 16.95 4.08009 18.26 5.38009 18.7C9.69009 20.14 14.3401 20.14 18.6501 18.7C19.8601 18.3 20.3901 16.87 19.7301 15.77L18.5801 13.86C18.2801 13.34 18.0201 12.41 18.0201 11.8V8.91003C18.0201 5.61003 15.3201 2.91003 12.0201 2.91003Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                        <path d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"/>
                    </svg>                            
                </button>
                <div className="user-info">
                    <svg className="user-image" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill="white" fill-opacity="0.01"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12.0321 19C8.67459 19 6.80643 17.2316 6.80643 14V13H17.1158L17.1434 13.9715C17.2358 17.2145 15.4003 19 12.0321 19ZM15.0875 15C14.8526 16.3955 13.9089 17 12.0321 17C10.1563 17 9.18179 16.3902 8.89677 15H15.0875ZM14 8H17V10H14V8ZM10 8H7V10H10V8Z" fill="black"/>
                    </svg>
                    <span className="user-name">{currentUser.name}</span>       
                    <Container>
                      <NavDropdown.Divider />
                      <button onClick={() => signOut()}>Sign Out</button>
                      <NavDropdown.Divider />
                      <button onClick={() => deleteAccount()}>DELETE ACCOUNT</button>
                  </Container>                 
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5999 7.45837L11.1666 12.8917C10.5249 13.5334 9.4749 13.5334 8.83324 12.8917L3.3999 7.45837" stroke="#596780" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>    
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

        <Tabs
          activeKey="Account"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="FinanceApp" title="Finance Tracking" disabled>
          <nav className='navbar navbar-dark bg-primary'>
            <div className='container-fluid'>
              <a className='navbar-brand' href='#'>
                Finance Tracking
              </a>
            </div>
          </nav>
          </Tab>
          <Tab eventKey="Account" title="Account">
            <Container>
              <div className="form-bg" hidden={hidden}>
                <div className="form-container">
                    <form onSubmit={doSignIn} className="form-horizontal">
                        <h3 className="title">Login</h3>
                        <FloatingLabel controlId="floatingInput" label="Username" className="mb-3" >
                          <Form.Control placeholder="Joe" value={username} onChange={e => setUsername(e.target.value)}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                        </FloatingLabel>
                        <span className="forgot-pass"><a href="#" onClick={() => setHidden(true)}>Need an account?</a></span>
                        <button className="btn signin" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
            <div className="form-bg" hidden={!hidden}>
                <div className="form-container">
                    <form onSubmit={doRegister} className="form-horizontal">
                        <h3 className="title">Register</h3>
                        <FloatingLabel controlId="floatingInput" label="Username" className="mb-3" >
                          <Form.Control placeholder="Joe" value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                          <Form.Control type="password" placeholder="Password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                        </FloatingLabel>
                        <span className="forgot-pass"><a href="#" onClick={() => setHidden(false)}>Have an account?</a></span>
                        <button className="btn signin" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
            </Container>

          </Tab>
        </Tabs>
      </div>
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
              <button className="notification">
                  <svg className="notification__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.0201 2.91003C8.71009 2.91003 6.02009 5.60003 6.02009 8.91003V11.8C6.02009 12.41 5.76009 13.34 5.45009 13.86L4.30009 15.77C3.59009 16.95 4.08009 18.26 5.38009 18.7C9.69009 20.14 14.3401 20.14 18.6501 18.7C19.8601 18.3 20.3901 16.87 19.7301 15.77L18.5801 13.86C18.2801 13.34 18.0201 12.41 18.0201 11.8V8.91003C18.0201 5.61003 15.3201 2.91003 12.0201 2.91003Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                      <path d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"/>
                  </svg>                            
              </button>
              <div className="user-info">
                  <svg className="user-image" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" fill="white" fill-opacity="0.01"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12.0321 19C8.67459 19 6.80643 17.2316 6.80643 14V13H17.1158L17.1434 13.9715C17.2358 17.2145 15.4003 19 12.0321 19ZM15.0875 15C14.8526 16.3955 13.9089 17 12.0321 17C10.1563 17 9.18179 16.3902 8.89677 15H15.0875ZM14 8H17V10H14V8ZM10 8H7V10H10V8Z" fill="black"/>
                  </svg>
                  <span className="user-name">{currentUser.name}</span>       
                  <Container>
                    <NavDropdown.Divider />
                    <button onClick={() => signOut()}>Sign Out</button>
                    <NavDropdown.Divider />
                    <button onClick={() => deleteAccount()}>DELETE ACCOUNT</button>
                </Container>                 
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5999 7.45837L11.1666 12.8917C10.5249 13.5334 9.4749 13.5334 8.83324 12.8917L3.3999 7.45837" stroke="#596780" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>    
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

