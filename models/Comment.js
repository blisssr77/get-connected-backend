const { default: mongoose } = require('mongoose');
const User = require('./User');
const Student = require('./Student');
const Freelancer = require('./Freelancer');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: false},
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer', required: false},
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
    