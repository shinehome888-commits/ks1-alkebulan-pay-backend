const EligibilityEngine = require('../services/EligibilityEngine');

const getEligibility = async (req, res) => {
  try {
    const result = await EligibilityEngine.evaluateEligibility(req.params.tradeId);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { getEligibility };
