import React from 'react'
import { useState } from 'react'

const App = () => {
  
 const[title,setTitle] = useState("");
 const[amount,setAmount] = useState("");
 const[expenses, setExpenses] = useState([]);

 function handleAddExpense(e){
  //e.preventDefault() browser ka default form submit behavior rokta hai, taaki page reload na ho.
   e.preventDefault(); 

   //Agar title ya amount empty hai, toh expense add nahi hoga.
  if(title==="" || amount === ""){
    alert("Please fill all fields");
    return;
  }

  const newExpense = {
    id:Date.now(),
    title:title,
    amount:Number(amount),//Input se value generally string milti hai."150"+50=15050,,"amount150"+40=190
  };

  setExpenses([...expenses, newExpense]);
    //Spread operator ...expenses purane expenses ko copy karta hai.
    // State mein purana data + naya data add ho gaya.
    //   { title: "Food", amount: 150 }
    //  { title: "Travel", amount: 80 }
    //  { title: "Food", amount: 150 },
    //{ title: "Travel", amount: 80 }
  setTitle("");
  setAmount("");
 }
 
 const totalExpenses = expenses.reduce(
  (total,expense)=>total + expense.amount,0
 );
 ////
 //0 + 150 = 150
//150 + 80 = 230
//230 + 50 = 280
 //totalExpenses = 280
 //₹30,000 - ₹280 = ₹29,720

 const income = 30000;
 const balance = income - totalExpenses;


  return (
    <div className='app'>
      <h1>Expense Tracker</h1>
      <p className='subtitle'>
        Track Your daily Expenses
      </p>

      <div className='balance-card'>
         <p>Total Balance</p>
         <h2>₹{balance}</h2>
      </div>

      <div className='summary'>
        <div className='summary-card'>
           <p>Income</p>
           <h3>₹{income}</h3>
        </div>

      <div className='summary-card'>
        <p>Expenses</p>
        <h3>₹{totalExpenses}</h3>
      </div>
      </div>

      <div className='form-card'>
        <h2>Add Transaction</h2>
        <form onSubmit={handleAddExpense}>
          <input type="text"
         placeholder='Expense Title'
         value={title}
         onChange={(e)=>setTitle(e.target.value)} />

         <input
        type="number"
         placeholder='Amount'
         value={amount}
         onChange={(e)=>setAmount(e.target.value)}
          />
    
      <button type='submit'>Add Expense</button>
        </form>       
      </div>
      <div className='form-card'>
        <h2>Recent Expenses</h2>
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ):(
          expenses.map((expense)=>(
            <div className='expense-item' key={expense.id}>
               <span>{expense.title}</span>
               <span>₹{expense.amount}</span>
            </div>
          ))
        )}
      </div>
    </div>
   

  )
}

export default App
