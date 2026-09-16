const Expense = require("../models/Expense");

//Get all expenses
const getExpenses = async (req, res) => {
     try{
        const expenses = await Expense.find().sort({createdAt:-1});
        res.status(200).json(expenses);
       
    }catch(error){
        res.status(500).json({
            message:"Failed to Fetch expenses",
        });
    }
};

//Add new Expenses
const addExpense = async (req, res) => {
     try {
         const {title, amount } = req.body;
  
    if(!title || amount === undefined || amount === ""){
        return res.status(400).json({
        message:"Title and amount are required",
    });
    }
    
    const newExpense = await Expense.create({
        //Ye data MongoDB database mein permanently save karega.
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
};

//Delete Expense
const deleteExpense = async (req, res) => {
  try{
   const {id} = req.params;
 //URL se expense ki ID lega.
 
   const deletedExpenses = await Expense.findByIdAndDelete(id);

   if(!deletedExpenses){
     return res.status(404).json({
       message:"Expense not found",
     });
   }

   res.json({
      message:"Expense deleted Successfully",
   });

  }catch(error){
    res.status(500).json({
        message:"Failed to delete Expenses",
    });
  }
};

//update the Expenses
const updateExpense = async (req,res) => {
    try {
        const {id} = req.params;
       const {title,amount} = req.body;

       if(!title || amount=== undefined || amount== ""){
        return res.status(400).json({
            message:"Title and amount are required",
        });
       }

    const update = await Expense.findByIdAndUpdate(
        id,
        {
            title:title,
            amount:Number(amount),
        },
        {
            new:true,
            runValidators:true,
        }
    );

    res.status(200).json({
        message:"Expense Updated successfully",
        expense:updateExpense,
    });


    } catch (error) {
        res.status(500).json({
            message:"Failed to update Expense"
        });
    }
};



module.exports={
    getExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
};