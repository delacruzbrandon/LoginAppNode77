const { mongoose, Schema, createModel } = require('../helpers/mongoose_helper');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
});

exports.User = createModel('User', userSchema, 'users'); // Model