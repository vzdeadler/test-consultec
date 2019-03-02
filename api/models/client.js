const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    sex: { type: String, required: true },
    id: { type: Number, required: true },
    id_type: { type: String, required: true },
    email: { type: String, required: true },
    locality: { type: String, required: true },
    active: { type: Boolean, required: true }
});

module.exports = mongoose.model('Client', userSchema);