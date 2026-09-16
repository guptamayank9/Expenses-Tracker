import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const App = () => {
  
 const[title,setTitle] = useState("");
 const[amount,setAmount] = useState("");
 const[expenses, setExpenses] = useState([]);
 const[editingId, seteditingId] = useState(null);
 const[editTitle, setEditTitle] = useState("");
 const[editAmount, setEditAmount] = useState("");
 

  useEffect(()=>{
    fetch("http://localhost:5000/api/expenses")
    .then((response)=>response.json())
    .then((data)=>{
     setExpenses(data);
    })
    .catch((error)=>{
      console.log("Error fetching expenses:", error);
    })
  },[]);
//React component load hone par ek baar chalega.

 async function handleAddExpense(e){
  //e.preventDefault() browser ka default form submit behavior rokta hai, taaki page reload na ho.
   e.preventDefault(); 

   //Agar title ya amount empty hai, toh expense add nahi hoga.
  if(title==="" || amount === ""){
    alert("Please fill all fields");
    return;
  } 

  try{
   const response = await fetch(
    "http://localhost:5000/api/expenses",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        title:title,
        amount:Number(amount),
      }),
    }
   );
   const data = await response.json();

   if(!response.ok){
    alert(data.message);
    return;
   }
   setExpenses([...expenses, data.expense]);
   setTitle("");
   setAmount("");
  }catch(error){
    console.log("Error adding expense:",error);
  }
 }

//   const newExpense = {
//     id:Date.now(),
//     title:title,
//     amount:Number(amount),//Input se value generally string milti hai."150"+50=15050,,"amount150"+40=190
//   };

//   setExpenses([...expenses, newExpense]);
//     //Spread operator ...expenses purane expenses ko copy karta hai.
//     // State mein purana data + naya data add ho gaya.
//     //   { title: "Food", amount: 150 }
//     //  { title: "Travel", amount: 80 }
//     //  { title: "Food", amount: 150 },
//     //{ title: "Travel", amount: 80 }
 
//Delete function
async function handleDeleteExpense(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/expenses/${id}`,
      {
        method:"DELETE",
      }
    );
    const data = await response.json();

    if(!response.ok){
      alert(data.message);
      return
    }
    //Delete hone ke baad react list updatae hogi
    //Deleted expense ko React ki list se remove karega.
    setExpenses((previousExpenses)=>
    previousExpenses.filter(
      (expense)=>expense._id !== id
    ));

  } catch (error) {
    console.log("Error deleting expense:",error);
  }
}

async function handleUpdateExpense(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/expenses/${id}`,
      {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        }
      },
      body.JSON.stringify({
        title:editTitle,
        amount:Number(editAmount),
      }),
      
    );
    const data = await response.json();

    if(response.ok){
      alert(data.message);
      return;
    }

    setExpenses((previousExpenses)=>
    previousExpenses.map((expense)=>
    expense._id === id ? data.expense:expense)
  );
  seteditingId(null);
  setEditTitle("");
  setEditAmount("");

  } catch (error) {
    console.log("Error updating Expense:", error);
  }
}


 const totalExpenses = expenses.reduce(
  (total,expense)=>total + expense.amount,0
 );

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
 
  <div className='dashboard-grid'>
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

      <button className='add-btn'
       type='submit'>Add Expense</button>

        </form>       
      </div>

      <div className='form-card expenses-card'>
        <h2>Recent Expenses</h2>
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ):(
          expenses.map((expense)=>(
            <div className='expense-item' key={expense._id}>

               <span className='expense-title'>
                {expense.title}</span>

               <span className='expense-amount'
               >₹{expense.amount}</span>

               <button className='delete-btn'
               onClick={()=>handleDeleteExpense(expense._id)}
               >Delete</button>

            </div>
          ))
        )}
      </div>
      </div>
    </div>
  )
}

export default App
