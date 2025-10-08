const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { viewBalance, sendMoney, getTransactionHistory } = require('../controller/transactions');
const { validateTransaction } = require('../middleware/transaction');

const router = express.Router();

router.get('/balance', verifyToken, viewBalance);
router.post('/sendMoney', verifyToken, validateTransaction, sendMoney);
router.get('/history', verifyToken, getTransactionHistory)

module.exports={tranasactionRouter:router};