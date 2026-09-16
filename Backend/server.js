const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();


const PORT = 5000;

//Middleware

app.use(cors());
app.use(express.json());

const expenseSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: true,
        },
        amount:{
            type:Number,
            required:true,
        },
    },
    {
        timestamps:true
    }
);
//Expense Model
const Expense = mongoose.model("Expense", expenseSchema);



//Home Route
app.get('/',(req,res)=>{
    res.send("Expense Tracker Backend is running");
});

//Get all expenses
app.get('/api/expenses', async (req,res) => {
    try{
        const expenses = await Expense.find().sort({createdAt:-1});
        res.json(expenses);

    }catch(error){
        res.status(500).json({
            message:"Failed to Fetch expenses",
        });
    }
});
// //Temporary Expenses data
// let expenses= [];

// //Get all expenses
// app.get('/api/expenses',(req,res)=>{
//     res.json(expenses);
// });


//Add new Expenses
app.post('/api/expenses', async (req,res)=>{

    try {
         const {title, amount } = req.body;
  
    if(!title || !amount){
        return res.status(400).json({
        message:"Title and amount are required",
    });
    }
    
    const newExpense = await Expense.create({//Ye data MongoDB database mein permanently save karega.
        title:title,
        amount:Number(amount),
    });

    res.status(201).json({
        message:"Expense added Successfully",
        expense:newExpense,
    });
    } catch (error) {
        res.status(500).json({
            message:"Failed to add expense",
        });
    }
});


//Connect MONgoDb and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("Mongodb connected Successfully");
    
    app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`);
    });
  })
  .catch((error)=>{
    console.log("Mongodb connection Failed");
    console.log(error.message);
  });