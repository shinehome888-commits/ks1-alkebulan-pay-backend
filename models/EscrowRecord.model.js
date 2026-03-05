const mongoose = require('mongoose');
const EscrowRecordSchema = new mongoose.Schema({
  initiatorId: { type: String, required: true },
  counterpartyId: { type: String, required: true },
  amount: { type: Number, required: true },
  description: String,
  status: { type: String, default: 'PENDING_PAYMENT' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('EscrowRecord', EscrowRecordSchema);
