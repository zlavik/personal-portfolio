/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { remult } from "remult";
import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

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

  useEffect(() => {
    async function fetchUser() {
      fetch("/api/currentUser").then(async (result) => {
        const user = await result.json()
        console.log(user)
        remult.user = user;
        if (remult.user) {
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
    setTransactionData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    })
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

  async function addTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await fetch("/api/addUserTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transactionData)
    });

    if (result.ok) {
      remult.user = await result.json();
      setTransactionData({
        amount: '',
        category: '',
        description: '',
        is_income: false,
        date: ''
      })
      fetchTransactions();
    } else {
      alert(await result.json())
    }
  }

  if (!signedIn) {
    return (
      <div>
        
        <Tabs
          activeKey="Account"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
        <Tab eventKey="FinanceApp" title="Finance App" disabled>
        <nav className='navbar navbar-dark bg-primary'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='#'>
              Finance App
            </a>
          </div>
        </nav>
        </Tab>
        <Tab eventKey="Account" title="Account">
          <>
            <Nav>
              <Navbar.Collapse className="justify-content-end">
                <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Setting</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.2">Sign Out</NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            </Nav>
            <Container>
              <div className="form-bg" hidden={hidden}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6">
                            <div className="form-container">
                                <form onSubmit={doSignIn} className="form-horizontal">
                                    <h3 className="title">Login</h3>
                                    <div className="form-group">
                                        <span className="input-icon"><i className="fa fa-user"></i></span>
                                        <input 
                                        className="form-control" 
                                        value={username} 
                                        onChange={e => setUsername(e.target.value)}
                                        placeholder="Username"/>
                                    </div>
                                    <div className="form-group">
                                        <span className="input-icon"><i className="fa fa-lock"></i></span>
                                        <input 
                                        className="form-control" 
                                        type="password" 
                                        placeholder="Password"
                                        value={password} 
                                        onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <span className="forgot-pass"><a href="#" onClick={() => setHidden(true)}>Need an account?</a></span>
                                    <button className="btn signin" type="submit">Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-bg" hidden={!hidden}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6">
                            <div className="form-container">
                                <form onSubmit={doRegister} className="form-horizontal">
                                    <h3 className="title">Register</h3>
                                    <div className="form-group">
                                        <span className="input-icon"><i className="fa fa-user"></i></span>
                                        <input 
                                        className="form-control" 
                                        value={newUsername} 
                                        onChange={e => setNewUsername(e.target.value)}
                                        placeholder="Username"/>
                                    </div>
                                    <div className="form-group">
                                        <span className="input-icon"><i className="fa fa-lock"></i></span>
                                        <input 
                                        className="form-control" 
                                        type="password" 
                                        placeholder="Password"
                                        value={newPassword} 
                                        onChange={e => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <span className="forgot-pass"><a href="#" onClick={() => setHidden(false)}>Have an account?</a></span>
                                    <button className="btn signin" type="submit">Sign Up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Container>

          </>
        </Tab>
        </Tabs>
      </div>
    )
  }

  return (
    <div>

      <Tabs 
        defaultActiveKey="FinanceApp" 
        transition={false}
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="FinanceApp" title="Finance App">
        <nav className='navbar navbar-dark bg-primary'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='#'>
            </a>
          </div>
        </nav>

        <div className='container'>
          <form onSubmit={addTransaction}>

          <div className='mb-3 mt-3'>
              <label htmlFor='amount' className='form-label'>
                Amount
              </label>
              <input type='text' className='form-control' id='amount' name='amount' onChange={handleInputChange} value={transactionData.amount}/>
            </div>

            <div className='mb-3'>
              <label htmlFor='category' className='form-label'>
                Category
              </label>
              <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={transactionData.category}/>
            </div>

            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                Description
              </label>
              <input type='text' className='form-control' id='description' name='description' onChange={handleInputChange} value={transactionData.description}/>
            </div>

            <div className='mb-3'>
              <label htmlFor='is_income' className='form-label'>
                Is Income?
              </label>
              <input type='checkbox' id='is_income' name='is_income' onChange={handleInputChange} checked={transactionData.is_income}/>
            </div>

            <div className='mb-3'>
              <label htmlFor='date' className='form-label'>
                Date
              </label>
              <input type='text' className='form-control' id='date' name='date' onChange={handleInputChange} value={transactionData.date}/>
            </div>

            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
          <table className='table table-striped table-bordered table-hover'>
            <thead>
              <tr>
                <th>amount</th>
                <th>category</th>
                <th>description</th>
                <th>Income?</th>
                <th>Date</th>
                <th>userID</th>

              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction: any) => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.amount}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.is_income ? 'Yes': 'No'}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.userId}</td>

                  </tr>
                )
              })}
            </tbody>

          </table>
        </div>
        </Tab>
        <Tab eventKey="Account" title="Account">
        <nav className='navbar navbar-dark bg-primary'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='#'>
            </a>
          </div>
        </nav>

        <Navbar collapseOnSelect expand="lg" >
        <Container>
            Signed in as: {currentUser.name} 
            <NavDropdown.Divider />
            <button onClick={() => signOut()}>Sign Out</button>
            <NavDropdown.Divider />
            <button onClick={() => deleteAccount()}>DELETE ACCOUNT</button>
        </Container>
      </Navbar>
        </Tab>
      </Tabs>
    </div>
  )
}

