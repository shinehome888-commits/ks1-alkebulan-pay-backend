const Transaction = require('../models/Transaction.model');

const createTransaction = async (req, res) => {
  try {
    const { tradeId, counterpartyId, amount, description, status = 'INITIATED' } = req.body;
    const tx = new Transaction({ tradeId, counterpartyId, amount, description, status });
    await tx.save();
    res.status(201).json({ id: tx._id, ...tx.toObject() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTransaction };
