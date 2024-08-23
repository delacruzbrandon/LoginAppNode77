const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Function to create a model
function createModel(name, schema) {
    return mongoose.model(name, schema);
}

module.exports = { mongoose, Schema, createModel };