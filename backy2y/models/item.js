const mongoose = require('mongoose');
const itemsSchema = new mongoose.Schema({
    id: Number,
    category: String,
    description: String,
    brand:String,
    image: String,
    price: Number,
    title: String,
    amount: Number,
});

module.exports.Item = mongoose.model('Item', itemsSchema);