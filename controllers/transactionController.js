const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transactionModel');

// @desc    Get user transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
});

// @desc    Add new transaction
// @route   POST /api/transactions
// @access  Private
const addTransaction = asyncHandler(async (req, res) => {
    const { name, amount, type, category, recurring } = req.body;

    if (!name || !amount || !type || !category) {
        res.status(400);
        throw new Error('Please fill in all required fields');
    }

    const transaction = await Transaction.create({
        user: req.user.id,
        name,
        amount,
        type,
        category,
        recurring
    });

    res.status(201).json(transaction);
});

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    // Check for user
    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedTransaction);
});

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    // Check for user
    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await transaction.remove();
    res.json({ id: req.params.id });
});

module.exports = {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
};
