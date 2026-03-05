const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
  tradeId: { type: String, required: true },
  counterpartyId: { type: String, required: true },
  amount: { type: Number, required: true },
  description: String,
  status: { type: String, default: 'INITIATED' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Transaction', TransactionSchema);
