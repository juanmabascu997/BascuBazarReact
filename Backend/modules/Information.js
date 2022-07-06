const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    promotion: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    facebook:{
        type: String,
        required: true
    },
    instagram:{
        type: String,
        required: true
    },
    hours:{
        type: String,
        required: true
    }
});

const Information = mongoose.model('Information', informationSchema);

module.exports = Information;