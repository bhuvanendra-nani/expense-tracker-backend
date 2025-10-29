const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },
    category: {
        type: String,
        required: true
    },
    recurring: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
