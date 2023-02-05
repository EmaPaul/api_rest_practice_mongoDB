const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('User',userSchema);
