const express = require("express");

const {
    getExpenses,
    addExpense,
    deleteExpense,
} = require('../controllers/expenseController');

const router = express.Router();

//Get all expenses
router.get("/", getExpenses);

//POST NEW expenses
router.post("/", addExpense);

//Delete Expense
router.delete("/:id",deleteExpense);

module.exports = router;