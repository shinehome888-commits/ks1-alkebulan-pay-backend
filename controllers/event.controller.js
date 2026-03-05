const ReputationEngine = require('../services/ReputationEngine');
const EligibilityEngine = require('../services/EligibilityEngine');
const TradeMetric = require('../models/TradeMetric.model');

const postEvent = async (req, res) => {
  try {
    const { eventType, tradeId, meta } = req.body;
    if (!eventType || !tradeId) return res.status(400).json({ message: 'eventType and tradeId required' });
    await TradeMetric.create({ eventType, tradeId, meta });
    await ReputationEngine.calculateReputation(tradeId);
    await EligibilityEngine.evaluateEligibility(tradeId);
    res.json({ success: true, tradeId, eventType });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { postEvent };
