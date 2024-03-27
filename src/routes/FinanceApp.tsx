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
  const [signedIn, setSignedIn] = useState(false);
  const [transactions, setTransaction] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });

  useEffect(() => {
    fetch("/api/currentUser").then(async (result) => {
      const user = await result.json()
      remult.user = user;
      remult.user!.name = user.username;
      if (remult.user) {
        setSignedIn(true)
        fetchTransactions();
      }
    });
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
      remult.user!.name = user.username;
      setSignedIn(true);
      setUsername("");
      setPassword("")
    } else {
      alert(await result.json())
    }
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
      remult.user!.name = user.username;
      setSignedIn(true);
      setNewUsername("");
      setNewPassword("");
    } else {
      alert(await result.json())
    }
  }

  async function signOut() {
    await fetch("/api/signOut", {
      method: "POST"
    });
    setSignedIn(false);
    remult.user = undefined; 
  }

  async function deleteAccount() {
    await fetch("/api/deleteAccount", {
      method: "POST"
    });
    setSignedIn(false);
    remult.user = undefined; 
  }

  const fetchTransactions =  async () => {
    await fetch("/api/loadUserTransaction").then(async (result) => {
      if (remult.user) setTransaction(await result.json());
    })
  }

  const handleInputChange = (event: { target: { type: string; checked: any; value: any; name: any; }; }) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
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
      body: JSON.stringify(formData)
    });
    console.log("test")

    if (result.ok) {
      remult.user = await result.json();
      setFormData({
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
                <Navbar.Text>
                  Signed in as: <a href="#login">Guest</a>
                </Navbar.Text>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Setting</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.2">Sign Out</NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            </Nav>
            <h1>Sign in or register</h1>
            <main>
              <form onSubmit={doSignIn}>
                <input 
                  value={username} 
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Username"
                />
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <button type="submit">Sign In</button>
              </form>
              <form onSubmit={doRegister}> {/* Separate form for registration */}
                <input 
                  value={newUsername} 
                  onChange={e => setNewUsername(e.target.value)}
                  placeholder="Username"
                />
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Password"
                />
                <button type="submit">Register</button>
              </form>
            </main>
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
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="FinanceApp" title="Finance App">
        <nav className='navbar navbar-dark bg-primary'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='#'>
              Finance App
            </a>
          </div>
        </nav>

        <div className='container'>
          <form onSubmit={addTransaction}>

          <div className='mb-3 mt-3'>
              <label htmlFor='amount' className='form-label'>
                Amount
              </label>
              <input type='text' className='form-control' id='amount' name='amount' onChange={handleInputChange} value={formData.amount}/>
            </div>

            <div className='mb-3'>
              <label htmlFor='category' className='form-label'>
                Category
              </label>
              <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={formData.category}/>
            </div>

            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                Description
              </label>
              <input type='text' className='form-control' id='description' name='description' onChange={handleInputChange} value={formData.description}/>
            </div>

            <div className='mb-3'>
              <label htmlFor='is_income' className='form-label'>
                Is Income?
              </label>
              <input type='checkbox' id='is_income' name='is_income' onChange={handleInputChange} checked={formData.is_income}/>
            </div>

            <div className='mb-3'>
              <label htmlFor='date' className='form-label'>
                Date
              </label>
              <input type='text' className='form-control' id='date' name='date' onChange={handleInputChange} value={formData.date}/>
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
                  </tr>
                )
              })}
            </tbody>

          </table>
        </div>
        </Tab>
        <Tab eventKey="Account" title="Account">
        <Navbar collapseOnSelect expand="lg" >
        <Container>
          <footer>
            Hello {remult.user!.name} 
            <NavDropdown.Divider />
            <button onClick={() => signOut()}>Sign Out</button>
            <NavDropdown.Divider />
            <button onClick={() => deleteAccount()}>DELETE ACCOUNT</button>
          </footer>
        </Container>
      </Navbar>
        </Tab>
      </Tabs>
    </div>
  )
}

