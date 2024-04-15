const mongoose = require('mongoose');

const new_itemSchema = new mongoose.Schema({
    item: String,
    details: String,
    price: Number,
    file: String
});

const Add_newitem = mongoose.model("Add_newitem", new_itemSchema);
module.exports = Add_newitem;
