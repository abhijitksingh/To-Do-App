const mongoose = require("mongoose");



const todoSchema = new mongoose.Schema({

    title: String,
    caption: String,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }

});



const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;