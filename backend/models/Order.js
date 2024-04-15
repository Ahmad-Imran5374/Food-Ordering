const mongoose = require('mongoose');

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
const day = date.getDate();

const OrderSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    total: Number,
    items: [{ item: String, quantity: Number }],
    day:{
        type:Number,
        default:day
    },
    month:{
        type:Number,
        default:month
    },
    year:{
        type:Number,
        default:year
    }
});

const Orders = mongoose.model('Orders', OrderSchema);

module.exports = Orders;
