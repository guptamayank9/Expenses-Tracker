const express = require('express');
const cors = require('cors');
require("dotenv").config();

const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();


const PORT = process.env.PORT || 5000;

//Middleware

app.use(cors());
app.use(express.json());


//Home Route
app.get('/',(req,res)=>{
    res.send("Expense Tracker Backend is running");
});

//Expense Routes
app.use('/api/expenses', expenseRoutes);

//Connect Database and start server
connectDB().then(()=>{
  app.listen(PORT,()=>{
  console.log(`Server running at http://localhost:${PORT}`);
 });
});

 

// //Get all expenses
// app.get('/api/expenses', async (req,res) => {
//     try{
//         const expenses = await Expense.find().sort({createdAt:-1});
//         res.json(expenses);

//     }catch(error){
//         res.status(500).json({
//             message:"Failed to Fetch expenses",
//         });
//     }
// });
// //Temporary Expenses data
// let expenses= [];

// //Get all expenses
// app.get('/api/expenses',(req,res)=>{
//     res.json(expenses);
// });


// //Add new Expenses
// app.post('/api/expenses', async (req,res)=>{

//     try {
//          const {title, amount } = req.body;
  
//     if(!title || !amount){
//         return res.status(400).json({
//         message:"Title and amount are required",
//     });
//     }
    
//     const newExpense = await Expense.create({//Ye data MongoDB database mein permanently save karega.
//         title:title,
//         amount:Number(amount),
//     });

//     res.status(201).json({
//         message:"Expense added Successfully",
//         expense:newExpense,
//     });
//     } catch (error) {
//         res.status(500).json({
//             message:"Failed to add expense",
//         });
//     }
// });

//Delete expenses
// app.delete('/api/expenses/:id', async(req,res)=>{
//   try{
//    const {id} = req.params;
//  //URL se expense ki ID lega.
 
//    const deletedExpenses = await Expense.findByIdAndDelete(id);
//    if(!deletedExpenses){
//      return res.status(404).json({
//        message:"Expense not found",
//      });
//    }
//    res.json({
//       message:"Expense deleted Successfully",
//    });
//   }catch(error){
//     res.status(500).json({
//         message:"Failed to delete Expenses",
//     });
//   }
// });



