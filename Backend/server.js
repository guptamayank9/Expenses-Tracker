const express = require('express');
const cors = require('cors');

const app = express();


const PORT = 5000;

//Middleware

app.use(cors());
app.use(express.json());

//Home Route
app.get('/',(req,res)=>{
    res.send("Expense Tracker Backend is running");
});

//Temporary Expenses data
let expenses= [];

//Get all expenses
app.get('/api/expenses',(req,res)=>{
    res.json(expenses);
});

//Add new Expenses
app.post('/api/expenses', (req,res)=>{
    const {title, amount } = req.body;

    if(!title || !amount){
        return res.status(400).json({
        message:"Title and amount are required",
    });
    }
     
    const newExpense = {
        id:Date.now(),
        title:title,
        amaount: Number(amount),
    };
    expenses.push(newExpense);

    res.status(201).json({
        message:"Expense added Successfully",
        expense:newExpense,
    });

});

//SERVER START
app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`);
});