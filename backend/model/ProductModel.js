const mongoose = require('mongoose');

var productSchema = new mongoose.Schema(
    {
        name: {
            type: String,

        },
        image: {
            type: String,

        },
        rating: {
            type: Number,

        },
        description: {
            type: String,

        },
        quantity: {
            type: Number,
        },
        price:{
            type : String,
        },
        categories:{
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema);
