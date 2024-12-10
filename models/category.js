const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ['income', 'expence'] },
    entries: [
        {
            desc: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model('Category', categorySchema);