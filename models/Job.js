const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide company name"],
        maxlength: 50

    },
    position: {
        type: String,
        required: [true, "Please provide position"],
        maxlength: 50
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    //tying job model to our user one
    createdBy: {
        type: mongoose.Types.ObjectId,
        //every time we create a job we assign it to one of the users
        ref: 'User',
        required: [true, 'Please provide user']
    },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);