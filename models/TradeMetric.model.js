const mongoose = require('mongoose');
const TradeMetricSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  tradeId: { type: String, required: true },
  meta: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('TradeMetric', TradeMetricSchema);
