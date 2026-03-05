const User = require('../models/User.model');
const Transaction = require('../models/Transaction.model');

class ReputationEngine {
  static async calculateReputation(tradeId) {
    const txns = await Transaction.find({ tradeId });
    const total = txns.length;
    if (total === 0) return 50;

    const disputes = txns.filter(t => t.status === 'DISPUTED').length;
    const completionRate = (total - disputes) / total;
    const totalVolume = txns.reduce((sum, t) => sum + (t.amount || 0), 0);
    const volumeScore = Math.min(1, totalVolume / 10000) * 100;
    const repaymentScore = (total - disputes) / total * 100;

    const score = 0.4 * completionRate * 100 + 0.3 * volumeScore + 0.3 * repaymentScore;
    const final = Math.round(Math.max(0, Math.min(100, score)));

    await User.updateOne({ tradeId }, { reputationScore: final });
    return final;
  }
}
module.exports = ReputationEngine;
