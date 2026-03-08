const EscrowRecord = require('../models/EscrowRecord.model');

const createEscrow = async (req, res) => {
  try {
    const { initiatorId, counterpartyId, amount, description } = req.body;
    if (!initiatorId || !counterpartyId || !amount) return res.status(400).json({ message: 'Missing fields' });
    const escrow = new EscrowRecord({ initiatorId, counterpartyId, amount, description, status: 'PENDING_PAYMENT' });
    await escrow.save();
    res.status(201).json({ id: escrow._id, ...escrow.toObject() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createEscrow };
