const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  type: { type: String, enum: ['Income', 'Expense'], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  balance:{type:Number, required:true},
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Finance', financeSchema);
