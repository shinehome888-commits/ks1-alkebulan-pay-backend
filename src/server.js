const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();
require('./config/db');

const app = express();

app.use(helmet());
app.use(cors({
  origin: [
    'https://ks1-alkebulan-pay-identity-hub.pages.dev',
    'https://ks1-alkebulan-pay-trade-coordination.pages.dev',
    'https://ks1-alkebulan-pay-secure-transaction.pages.dev',
    'https://ks1-alkebulan-pay-trade-support.pages.dev',
    'https://ks1-alkebulan-pay-admin.pages.dev',
    /\.pages\.dev$/,
    'http://localhost:3000'
  ]
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/escrow', require('./routes/escrow.routes'));
app.use('/core/event', require('./routes/event.routes'));
app.use('/eligibility', require('./routes/eligibility.routes'));
app.use('/transactions', require('./routes/transaction.routes'));
app.use('/admin', require('./routes/admin.routes'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[KS1 CORE API] Running on port ${PORT}`);
});
