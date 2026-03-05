const User = require('../models/User.model');
const Transaction = require('../models/Transaction.model');

class EligibilityEngine {
  static async evaluateEligibility(tradeId) {
    const user = await User.findOne({ tradeId });
    if (!user) throw new Error('User not found');

    const rep = user.reputationScore;
    const txns = await Transaction.find({ tradeId });
    const vol = txns.reduce((s, t) => s + (t.amount || 0), 0);
    const disputes = txns.filter(t => t.status === 'DISPUTED').length;

    const eligible = rep >= 70 && vol >= 1000 && disputes < 5;
    let risk = 'LOW';
    if (rep < 50 || disputes >= 3) risk = 'HIGH';
    else if (rep < 70) risk = 'MEDIUM';

    const maxFund = eligible ? Math.min(50000, vol * 0.5) : 0;
    const status = { eligible, maxFundingAmount: maxFund, riskLevel: risk };

    await User.updateOne({ tradeId }, { eligibilityStatus: status });
    return { ...status, reputationScore: rep, totalVolume: vol, disputes };
  }
}
module.exports = EligibilityEngine;
