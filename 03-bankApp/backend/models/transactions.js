const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = { Transaction };