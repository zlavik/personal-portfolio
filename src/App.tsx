/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { remult } from "remult";


function App() {
  const [transactions, setTransaction] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });


  useEffect(() => {
    fetchTransactions();
  }, []);


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


  return (

    <div>
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
    </div>
  )
}

export default App
