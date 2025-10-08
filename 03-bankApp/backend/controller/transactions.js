const { User } = require('../models/auth');
const { Transaction } = require('../models/transactions');

async function viewBalance(req,res){
    const mongoResponse = await User.findOne({email:req.email},{balance:1});
    const balance = mongoResponse.balance;
    res.status(200).json({
        message:"success",
        balance
    })
}

async function sendMoney(req,res) {
    const { recieverMail, amount } = req.body;
    const senderMail = req.email;
    const amt = Number(amount);
    try{
        if(amt<0){
            throw new Error('Amount is negative')
        }
        const reciever = await User.findOne({email:recieverMail},{balance:1})
        if(!reciever) throw new Error("Invalid reciever email address");

        const sender = await User.findOne({email:senderMail},{balance:1})
        if(sender.balance<amt) throw new Error("Unsufficient balance");

        sender.balance -= amt;
        reciever.balance += amt;

        await sender.save();
        await reciever.save();

        try {
            const tx = new Transaction({
                sender: sender._id,
                reciever: reciever._id,
                amount: amt
            });
            await tx.save();
        } catch (txErr) {
            console.error('Failed to record transaction:', txErr);
        }

        res.status(200).json({
            message:"Transaction successful"
        })
    }
    catch (err){
        res.status(400).json({
            "message":err.message || "Transaction Failed"
        })
    }
}


function getTransactionHistory(req,res){
    const userMail = req.email;
    (async () => {
        try{
            const user = await User.findOne({ email: userMail });
            if(!user) return res.status(404).json({ message: 'User not found' });

            // find transactions where user is sender or receiver
            const asSender = await Transaction.find({ sender: user._id })
                .populate('sender', 'name email')
                .populate('reciever', 'name email')
                .sort({ createdAt: -1 })
                .lean();

            const asReciever = await Transaction.find({ reciever: user._id })
                .populate('sender', 'name email')
                .populate('reciever', 'name email')
                .sort({ createdAt: -1 })
                .lean();

            // merge and deduplicate by _id (in case a transaction has same user as sender and receiver)
            const map = new Map();
            for (const t of asSender) map.set(String(t._id), t);
            for (const t of asReciever) map.set(String(t._id), t);

            const transactions = Array.from(map.values()).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

            return res.status(200).json({ message: 'success', transactions });
        } catch (err){
            console.error('getTransactionHistory error', err);
            return res.status(500).json({ message: err.message || 'Failed to get transaction history' });
        }
    })();
}

module.exports={viewBalance, sendMoney, getTransactionHistory}