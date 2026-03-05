const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  tradeId: { type: String, required: true, unique: true, match: [/^KS1-[A-Z0-9]{4}$/, 'Invalid Trade ID'] },
  walletAddress: { type: String, sparse: true },
  phoneNumber: { type: String, sparse: true },
  businessOwner: { type: String, required: true },
  ownerBirthday: { type: Date, required: true },
  businessName: { type: String, required: true },
  businessBirthday: { type: Date, required: true },
  businessType: { type: String, required: true },
  password: { type: String, required: true },
  reputationScore: { type: Number, default: 50 },
  eligibilityStatus: {
    eligible: { type: Boolean, default: false },
    maxFundingAmount: { type: Number, default: 0 },
    riskLevel: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'HIGH' }
  },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

UserSchema.index({ walletAddress: 1 }, { unique: true, partialFilterExpression: { walletAddress: { $exists: true, $ne: null } } });
UserSchema.index({ phoneNumber: 1 }, { unique: true, partialFilterExpression: { phoneNumber: { $exists: true, $ne: null } } });

module.exports = mongoose.model('User', UserSchema);
