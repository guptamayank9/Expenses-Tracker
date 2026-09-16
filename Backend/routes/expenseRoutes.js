const express = require("express");

const {
    getExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
} = require('../controllers/expenseController');

const router = express.Router();

//Get all expenses
router.get("/", getExpenses);

//POST NEW expenses
router.post("/", addExpense);

//Delete Expense
router.delete("/:id",deleteExpense);

//update Expense
router.put('/:id',updateExpense);

module.exports = router;